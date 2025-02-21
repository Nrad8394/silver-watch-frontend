import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <DashboardLayout userRole="patient">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-muted-foreground">Manage your preferences and notification settings</p>
        </div>

        <Tabs defaultValue="alerts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="alerts">Alert Settings</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="devices">Device Settings</TabsTrigger>
            <TabsTrigger value="sharing">Data Sharing</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Alert Preferences</CardTitle>
                <CardDescription>Configure how you receive alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {alertSettings.map((setting) => (
                  <div key={setting.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor={setting.id}>{setting.name}</Label>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch id={setting.id} checked={setting.enabled} />
                    </div>
                    {setting.threshold && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Alert Threshold</span>
                          <span className="text-sm font-medium">{setting.threshold.value}</span>
                        </div>
                        <Slider
                          defaultValue={[setting.threshold.value]}
                          max={setting.threshold.max}
                          min={setting.threshold.min}
                          step={setting.threshold.step}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your data privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {privacySettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor={setting.id}>{setting.name}</Label>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <Switch id={setting.id} checked={setting.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Device Configuration</CardTitle>
                <CardDescription>Manage your connected devices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {deviceSettings.map((device) => (
                  <div key={device.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>{device.name}</Label>
                        <p className="text-sm text-muted-foreground">{device.id}</p>
                      </div>
                      <Select defaultValue={device.updateFrequency}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="1min">Every minute</SelectItem>
                          <SelectItem value="5min">Every 5 minutes</SelectItem>
                          <SelectItem value="15min">Every 15 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Device Name</Label>
                      <Input defaultValue={device.name} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sharing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Sharing Preferences</CardTitle>
                <CardDescription>Control how your health data is shared</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {sharingSettings.map((setting) => (
                  <div key={setting.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor={setting.id}>{setting.name}</Label>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch id={setting.id} checked={setting.enabled} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

const alertSettings = [
  {
    id: "fall-detection",
    name: "Fall Detection Alerts",
    description: "Receive immediate notifications when a fall is detected",
    enabled: true,
    threshold: {
      value: 75,
      min: 0,
      max: 100,
      step: 5,
    },
  },
  {
    id: "heart-rate",
    name: "Heart Rate Alerts",
    description: "Get notified of abnormal heart rate readings",
    enabled: true,
    threshold: {
      value: 120,
      min: 60,
      max: 200,
      step: 5,
    },
  },
  {
    id: "medication",
    name: "Medication Reminders",
    description: "Receive reminders for medication schedules",
    enabled: true,
  },
  {
    id: "emergency",
    name: "Emergency Contact Alerts",
    description: "Automatically notify emergency contacts in critical situations",
    enabled: true,
  },
]

const privacySettings = [
  {
    id: "location",
    name: "Location Tracking",
    description: "Allow the system to track your location for emergency purposes",
    enabled: true,
  },
  {
    id: "data-collection",
    name: "Health Data Collection",
    description: "Collect and analyze health data for improved monitoring",
    enabled: true,
  },
  {
    id: "data-sharing",
    name: "Data Sharing with Healthcare Providers",
    description: "Share health data with authorized healthcare providers",
    enabled: true,
  },
  {
    id: "analytics",
    name: "Anonymous Analytics",
    description: "Contribute anonymous data for healthcare research",
    enabled: false,
  },
]

const deviceSettings = [
  {
    id: "hrm-001",
    name: "Heart Rate Monitor",
    updateFrequency: "realtime",
  },
  {
    id: "bp-002",
    name: "Blood Pressure Monitor",
    updateFrequency: "5min",
  },
  {
    id: "temp-003",
    name: "Temperature Sensor",
    updateFrequency: "1min",
  },
  {
    id: "fall-004",
    name: "Fall Detection Device",
    updateFrequency: "realtime",
  },
]

const sharingSettings = [
  {
    id: "share-caregivers",
    name: "Share with Caregivers",
    description: "Allow designated caregivers to access your health data",
    enabled: true,
  },
  {
    id: "share-doctors",
    name: "Share with Healthcare Providers",
    description: "Share data with your medical team",
    enabled: true,
  },
  {
    id: "share-emergency",
    name: "Emergency Services Access",
    description: "Allow emergency services to access your data in critical situations",
    enabled: true,
  },
  {
    id: "share-research",
    name: "Research Participation",
    description: "Share anonymous data for medical research purposes",
    enabled: false,
  },
]

