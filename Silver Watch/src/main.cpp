#include <Wire.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include "MAX30105.h"
#include <WiFiManager.h>
#include "FS.h"
#include "SPIFFS.h"
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

// Undefine conflicting macro before including spo2_algorithm.h
#undef FreqS

#include "spo2_algorithm.h" // For accurate SpO2 and heart rate calculation

// WiFiManager instance
WiFiManager wifiManager;

// Device credentials
String deviceName;
String deviceType;
String deviceId;

// MQTT credentials stored in SPIFFS
String mqttServer;
int mqttPort;
String mqttTopic;

// Connection Details
String host;

// User ID
String userId;

// DHT11
#define DHTPIN 2
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// MAX30105 sensor
MAX30105 particleSensor;

// Variables for peak detection and SpO2 calculation
#define BUFFER_SIZE 100
uint32_t irBuffer[BUFFER_SIZE];
uint32_t redBuffer[BUFFER_SIZE];

int32_t spo2 = 0;
int8_t validSPO2 = 0;
int32_t heartRate = 0;
int8_t validHeartRate = 0;

const int validHeartRateMin = 50;
const int validHeartRateMax = 180;
const int validSpO2Min = 70;
const int validSpO2Max = 100;

const int rateSize = 4;
float rateBuffer[rateSize];
int rateIndex = 0;
bool hasValidData = false;

// MQTT client
WiFiClient espClient;
PubSubClient client(espClient);

// NTP Client for time synchronization
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 0, 60000);

// Function to initialize SPIFFS
void initSPIFFS() {
  if (!SPIFFS.begin(true)) {
    Serial.println("Failed to mount SPIFFS");
    return;
  }
  Serial.println("SPIFFS mounted successfully");
}

// Function to load Device Credentials from SPIFFS
void loadDeviceCredentials() {
  File file = SPIFFS.open("/device_details.txt", "r");
  if (!file) {
    Serial.println("Failed to open Device config file.");
    return;
  }
  deviceName = file.readStringUntil('\n');
  deviceType = file.readStringUntil('\n');
  deviceId = file.readStringUntil('\n');
  file.close();

}

// Function to load MQTT credentials from SPIFFS
void loadMQTTCredentials() {
  File file = SPIFFS.open("/mqtt_config.txt", "r");
  if (!file) {
    Serial.println("Failed to open MQTT config file");
    return;
  }
  mqttServer = file.readStringUntil('\n');
  mqttPort = file.readStringUntil('\n').toInt();
  mqttTopic = file.readStringUntil('\n');
  file.close();
}

// Function to load Host credentials from SPIFFS
void loadHostCredentials() {
  File file = SPIFFS.open("/connection_details.txt", "r");
  if (!file) {
    Serial.println("Failed to open connection details config file");
    return;
  }
  host = file.readStringUntil('\n');
  file.close();
}

// Function to fetch user ID from an API
void fetchUserId() {
  HTTPClient http;
  String url = "http://192.168.91.200:80/devices/devices/2175536796239/";
  Serial.println("Fetching User ID from: " + url);
  http.begin(url);
  int httpResponseCode = http.GET();

  if (httpResponseCode == 200) {
    String response = http.getString();
    StaticJsonDocument<512> doc;
    DeserializationError error = deserializeJson(doc, response);

    if (!error && doc.containsKey("id")) {
      userId = doc["id"].as<String>();
      Serial.println("User ID: " + userId);
    } else {
      Serial.println("JSON Parsing Failed: " + String(error.c_str()));
    }
  } else {
    Serial.print("Failed to fetch user ID. HTTP Response code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
}

// Function to check and reconnect WiFi
void checkWiFi() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi lost... Reconnecting...");
    WiFi.disconnect();
    WiFi.reconnect();
  }
}

// Function to connect to WiFi using WiFiManager
void setup_wifi() {
  wifiManager.autoConnect("ESP32_AP");
  Serial.println("Connected to WiFi");
  timeClient.begin();
}

// Function to reconnect to MQTT broker with exponential backoff
void reconnect() {
  int attempt = 1;
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP32Client")) {
      Serial.println("connected!");
      return;
    }
    Serial.print("failed, rc=");
    Serial.println(client.state());
    delay(1000 * attempt);
    attempt = min(attempt * 2, 30);
  }
}

// Function to initialize the MAX30105 sensor
void initializeSensor() {
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30105 initialization failed!");
    while (1);
  }
  particleSensor.setup(60, 4, 2, 100, 411, 4096);
}

// Function to read heart rate and SpO2 using the Maxim algorithm in real-time
void readHeartRateAndSpO2() {
  for (int i = 0; i < BUFFER_SIZE; i++) {
    while (!particleSensor.available()) {
      particleSensor.check();
    }
    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
    particleSensor.nextSample();
  }
  maxim_heart_rate_and_oxygen_saturation(irBuffer, BUFFER_SIZE, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);
}
// Function to estimate blood pressure (placeholder method)
void estimateBloodPressure(float heartRate, float spo2, float &systolicBP, float &diastolicBP) {
  if (heartRate > 0 && spo2 > 0) {  // Only estimate BP with valid data
    systolicBP = 120 + (heartRate - 70) * 0.5 + (100 - spo2) * 0.25;
    diastolicBP = 80 + (heartRate - 70) * 0.3 + (100 - spo2) * 0.15;

    // Constrain the values within realistic bounds
    systolicBP = constrain(systolicBP, 90, 180);
    diastolicBP = constrain(diastolicBP, 60, 120);
  } else {
    systolicBP = 0;
    diastolicBP = 0;
  }
}

// Function to publish sensor data to MQTT
void publishSensorData(float temperature, float humidity, float heartRate, float spo2, float systolicBP, float diastolicBP) {
  if (heartRate > 0 && spo2 > 0) {  // Only publish valid data
    char msg[350]; // Increase buffer size for adding user_id
    snprintf(msg, sizeof(msg), "{\"user_id\": \"%s\", \"temperature\": %.2f, \"humidity\": %.2f, \"heart_rate\": %.2f, \"spo2\": %.2f, \"systolicBP\": %.2f, \"diastolicBP\": %.2f}", 
    userId, temperature, humidity, heartRate, spo2, systolicBP, diastolicBP);
    Serial.print("Publishing message: ");
    Serial.println(msg);
    client.publish("sensor/data", msg);
  } else {
    Serial.println("Invalid data, skipping publish...");
  }
}
void setup() {
  Serial.begin(9600);
  delay(1000);
  initSPIFFS();
  loadMQTTCredentials();
  loadDeviceCredentials();
  loadHostCredentials();
  setup_wifi();
  fetchUserId();
  client.setServer("192.168.91.200", 1883);
  dht.begin();
  initializeSensor();
}

void loop() {
  checkWiFi();
  reconnect();
  timeClient.update();
  client.loop();
  readHeartRateAndSpO2();
  // Read data from DHT11
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
   // Estimate Blood Pressure
   float systolicBP = 0;
   float diastolicBP = 0;
   estimateBloodPressure(heartRate, spo2, systolicBP, diastolicBP);
 
   // Print sensor values to serial monitor if valid
   if (hasValidData) {
     Serial.print("Temperature: ");
     Serial.print(temperature);
     Serial.print(" C, Humidity: ");
     Serial.print(humidity);
     Serial.print("%, Heart Rate: ");
     Serial.print(heartRate);
     Serial.print(" BPM, SpO2: ");
     Serial.print(spo2);
     Serial.print(" %, Systolic BP: ");
     Serial.print(systolicBP);
     Serial.print(" mmHg, Diastolic BP: ");
     Serial.print(diastolicBP);
     Serial.println(" mmHg");
   } else {
     Serial.println("Skipping invalid readings.");
   }
 
   // Publish sensor data to MQTT broker
   publishSensorData(temperature, humidity, heartRate, spo2, systolicBP, diastolicBP);
 
   // Wait before next iteration
   delay(1000); // Real-time update every second
}
