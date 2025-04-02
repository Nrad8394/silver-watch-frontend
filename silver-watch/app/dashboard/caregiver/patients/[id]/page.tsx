'use client'
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Heart, Thermometer, Activity, Droplets, 
  CalendarDays, PlusCircle, AlertTriangle, Clock, 
  RefreshCw, FileText, Pill, Phone, MessageSquare, 
  ArrowLeft,
} from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { api } from "@/utils/api"
import { useApi } from "@/hooks/useApi"
import ApiService from "@/handler/ApiService"
import { handleApiError } from "@/utils/api"
import type { User } from "@/types/users"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import type { Alert as AlertType } from "@/types/alerts"
import { isAxiosError } from "axios"

interface VitalSign {
  id: string;
  timestamp: string;
  heart_rate: number;
  blood_pressure_systolic: number;
  blood_pressure_diastolic: number;
  temperature: number;
  blood_oxygen: number;
  heart_rate_status: string;
  blood_pressure_status: string;
  temperature_status: string;
  blood_oxygen_status: string;
  patient_id: string;
}

interface PatientAlert {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  status: string;
  priority: string;
}

interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: string;
  address: string;
  contact: string;
  emergencyContact: string;
  primaryCaregiver: string;
  medicalConditions: string[];
  allergies: string[];
  roomNumber: string;
  lastActivity: string;
}

export default function PatientDetailPage() {
  const params = useParams();
  const patientId = params.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [vitalsHistory, setVitalsHistory] = useState<VitalSign[]>([]);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [patientAlerts, setPatientAlerts] = useState<PatientAlert[]>([]);
  const [timeRange, setTimeRange] = useState("24h");
  
  const { useFetchById } = useApi<User, User>(ApiService.USER_URL);
  
  const { data: userData, isLoading: isUserLoading } = useFetchById(patientId);
  
  // Load patient vitals
  useEffect(() => {
    async function loadPatientVitals() {
      if (!patientId) return;
      
      try {
        setIsLoading(true);
        
        // Get time range for vitals
        const now = new Date();
        const startTime = new Date(now);
        
        if (timeRange === '24h') {
          startTime.setDate(now.getDate() - 1);
        } else if (timeRange === '7d') {
          startTime.setDate(now.getDate() - 7);
        } else if (timeRange === '30d') {
          startTime.setDate(now.getDate() - 30);
        }
        
        // Fetch vitals data
        const vitalsResponse = await api.get(
          `${ApiService.VITAL_SIGNS_URL}?patient_id=${patientId}&ordering=-timestamp&timestamp_after=${startTime.toISOString()}`
        );
        
        if (vitalsResponse?.data?.results) {
          setVitalsHistory(vitalsResponse.data.results);
        }
        
        // Fetch alerts
        const alertsResponse = await api.get(
          `${ApiService.ALERTS_URL}?target_id=${patientId}&ordering=-timestamp`
        );
        
        if (alertsResponse?.data?.results) {
          const mappedAlerts = alertsResponse.data.results.map((alert: AlertType) => ({
            id: alert.id,
            type: alert.type || "Health Alert",
            message: alert.message,
            timestamp: alert.timestamp,
            status: alert.acknowledgement ? "Acknowledged" : "Active",
            priority: alert.priority
          }));
          setPatientAlerts(mappedAlerts);
        }
        
      } catch (error: unknown) {
        console.error("Error processing patient data:", error);
        if (isAxiosError(error)) {
          handleApiError(error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPatientVitals();
  }, [patientId, timeRange]);
  
  // Process user data
  useEffect(() => {
    if (!userData || isUserLoading) return;
    
    setPatientData({
      id: userData.id,
      name: `${userData.first_name} ${userData.last_name}`,
      age: calculateAge(userData.date_joined),
      gender: "Not specified",
      address: userData.address || "Not provided",
      contact: userData.phone_number || "Not provided",
      emergencyContact:  "Not provided",
      primaryCaregiver: "Dr. Sarah Johnson", // This would come from patient's relationships
      medicalConditions:  ["None specified"],
      allergies:  ["None specified"],
      roomNumber: "Not assigned",
      lastActivity: getTimeSince(userData.last_login || userData.date_joined)
    });
  }, [userData, isUserLoading]);
  
  function calculateAge(birthDate: string | undefined): number {
    if (!birthDate) return 0;
    
    const today = new Date();
    const bDate = new Date(birthDate);
    let age = today.getFullYear() - bDate.getFullYear();
    const monthDifference = today.getMonth() - bDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < bDate.getDate())) {
      age--;
    }
    
    return age;
  }
  
  function getTimeSince(timestamp: string): string {
    if (!timestamp) return "Unknown";
    
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} mins ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return `${Math.floor(diffHours / 24)} days ago`;
  }
  
  function getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case "normal":
        return "text-green-500";
      case "warning":
      case "elevated":
      case "low":
        return "text-yellow-500";
      case "critical":
      case "danger":
      case "very low":
      case "very high":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  }
  
  function getStatusBadge(status: string): string {
    switch (status?.toLowerCase()) {
      case "normal":
        return "outline";
      case "warning":
      case "elevated":
      case "low":
        return "secondary";
      case "critical":
      case "danger":
      case "very low":
      case "very high":
        return "destructive";
      default:
        return "outline";
    }
  }
  
  const formatChartDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return timeRange === '24h' 
      ? date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      : date.toLocaleDateString([], {month: 'numeric', day: 'numeric'}) + ' ' + 
        date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };
  
  const getLatestVitals = () => {
    return vitalsHistory.length > 0 ? vitalsHistory[0] : null;
  };
  
  const latestVitals = getLatestVitals();

  return (
    <DashboardLayout userRole="caregiver">
      <div className="space-y-6">        
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <a href="/dashboard/caregiver/patients">
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
            <div>
              <h2 className="text-2xl font-bold">{isLoading ? "Loading..." : patientData?.name}</h2>
              <p className="text-muted-foreground">
                {patientData?.age} years • {patientData?.gender} • Room {patientData?.roomNumber}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <a href={`tel:${patientData?.contact}`}>
                <Phone className="mr-2 h-4 w-4" /> Call
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/dashboard/caregiver/messages">
                <MessageSquare className="mr-2 h-4 w-4" /> Message
              </a>
            </Button>
            <Button variant="destructive">
              <AlertTriangle className="mr-2 h-4 w-4" /> Emergency
            </Button>
          </div>
        </div>
        
        {/* Active alerts */}
        {patientAlerts.some(alert => !alert.status.includes("Acknowledged")) && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Active Alerts</AlertTitle>
            <AlertDescription>
              This patient has {patientAlerts.filter(a => !a.status.includes("Acknowledged")).length} active alerts that require attention.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 md:w-fit md:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="careplan">Care Plan</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          
          {/* Patient Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Patient Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg" alt={patientData?.name} />
                      <AvatarFallback>{patientData?.name?.charAt(0) || "P"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium">{patientData?.name}</h3>
                      <p className="text-sm text-muted-foreground">Last active {patientData?.lastActivity}</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p>{patientData?.age} years</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p>{patientData?.gender}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Room Number</p>
                      <p>{patientData?.roomNumber}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Primary Caregiver</p>
                      <p>{patientData?.primaryCaregiver}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p>{patientData?.contact}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Emergency Contact</p>
                    <p>{patientData?.emergencyContact}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p>{patientData?.address}</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Medical Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-medium">Medical Conditions</h3>
                    <div className="flex flex-wrap gap-2">
                      {patientData?.medicalConditions.map((condition, index) => (
                        <Badge key={index} variant="outline">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-medium">Allergies</h3>
                    <div className="flex flex-wrap gap-2">
                      {patientData?.allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 font-medium">Recent Alerts</h3>
                    <ScrollArea className="h-[120px]">
                      <div className="space-y-2">
                        {patientAlerts.slice(0, 3).map((alert) => (
                          <div key={alert.id} className="rounded-md border p-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className={`h-4 w-4 ${alert.status === "Active" ? "text-red-500" : "text-amber-500"}`} />
                                <p className="text-sm font-medium">{alert.type}</p>
                              </div>
                              <Badge variant={alert.status === "Active" ? "destructive" : "outline"}>
                                {alert.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{getTimeSince(alert.timestamp)}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Current Vitals */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Current Vital Signs</CardTitle>
                  <CardDescription>Last updated {latestVitals ? getTimeSince(latestVitals.timestamp) : "N/A"}</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 1000);
                  }} 
                  disabled={isLoading}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center space-y-0">
                      <div>
                        <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                        <CardDescription>60-100 bpm</CardDescription>
                      </div>
                      <Heart className={`ml-auto h-4 w-4 ${getStatusColor(latestVitals?.heart_rate_status || '')}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {latestVitals?.heart_rate || 'N/A'}
                        <span className="text-sm font-normal text-muted-foreground"> bpm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadge(latestVitals?.heart_rate_status || '')}>
                          {latestVitals?.heart_rate_status || 'Unknown'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center space-y-0">
                      <div>
                        <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                        <CardDescription>90/60-120/80 mmHg</CardDescription>
                      </div>
                      <Activity className={`ml-auto h-4 w-4 ${getStatusColor(latestVitals?.blood_pressure_status || '')}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {latestVitals?.blood_pressure_systolic || 'N/A'}/{latestVitals?.blood_pressure_diastolic || 'N/A'}
                        <span className="text-sm font-normal text-muted-foreground"> mmHg</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadge(latestVitals?.blood_pressure_status || '')}>
                          {latestVitals?.blood_pressure_status || 'Unknown'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center space-y-0">
                      <div>
                        <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                        <CardDescription>36.1-37.5 °C</CardDescription>
                      </div>
                      <Thermometer className={`ml-auto h-4 w-4 ${getStatusColor(latestVitals?.temperature_status || '')}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {latestVitals?.temperature || 'N/A'}
                        <span className="text-sm font-normal text-muted-foreground"> °C</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadge(latestVitals?.temperature_status || '')}>
                          {latestVitals?.temperature_status || 'Unknown'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center space-y-0">
                      <div>
                        <CardTitle className="text-sm font-medium">Blood Oxygen</CardTitle>
                        <CardDescription>95-100%</CardDescription>
                      </div>
                      <Droplets className={`ml-auto h-4 w-4 ${getStatusColor(latestVitals?.blood_oxygen_status || '')}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {latestVitals?.blood_oxygen || 'N/A'}
                        <span className="text-sm font-normal text-muted-foreground"> %</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusBadge(latestVitals?.blood_oxygen_status || '')}>
                          {latestVitals?.blood_oxygen_status || 'Unknown'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Schedule and Activity */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Pill className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Morning Medication</p>
                          <p className="text-sm text-muted-foreground">8:00 AM - Administered</p>
                        </div>
                        <Badge>Completed</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Activity className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Physical Therapy</p>
                          <p className="text-sm text-muted-foreground">11:30 AM</p>
                        </div>
                        <Badge variant="outline">Upcoming</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Pill className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Afternoon Medication</p>
                          <p className="text-sm text-muted-foreground">2:00 PM</p>
                        </div>
                        <Badge variant="outline">Upcoming</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <CalendarDays className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Doctor's Visit</p>
                          <p className="text-sm text-muted-foreground">4:30 PM</p>
                        </div>
                        <Badge variant="outline">Upcoming</Badge>
                      </div>
                    </div>
                  </ScrollArea>
                  
                  <Button className="mt-4 w-full" variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg border p-4">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {["Medication administered", "Vital signs checked", "Blood sample taken", "Caregiver visit", "Activity monitor alert"][i]}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {["2 hours ago", "4 hours ago", "Yesterday at 4:30 PM", "Yesterday at 2:15 PM", "2 days ago"][i]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Vital Signs Tab */}
          <TabsContent value="vitals" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Vital Signs History</CardTitle>
                  <CardDescription>View trends over time</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <select 
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                  </select>
                  <Button variant="outline" onClick={() => setTimeRange(timeRange)}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="h-[500px]">
                {isLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : vitalsHistory.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[...vitalsHistory].reverse()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={formatChartDate}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                        formatter={(value, name) => {
                          const units: Record<string, string> = {
                            heart_rate: 'bpm',
                            blood_pressure_systolic: 'mmHg',
                            blood_pressure_diastolic: 'mmHg',
                            temperature: '°C',
                            blood_oxygen: '%'
                          };
                          return [`${value} ${units[name] || ''}`, name.replace(/_/g, ' ')];
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="heart_rate" stroke="#ff0000" name="Heart Rate" />
                      <Line type="monotone" dataKey="blood_pressure_systolic" stroke="#0000ff" name="Systolic BP" />
                      <Line type="monotone" dataKey="blood_pressure_diastolic" stroke="#8884d8" name="Diastolic BP" />
                      <Line type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature" />
                      <Line type="monotone" dataKey="blood_oxygen" stroke="#00ff00" name="Blood Oxygen" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">No vital signs data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Vital Signs Readings</CardTitle>
                <CardDescription>Historical data points</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {vitalsHistory.map((reading) => (
                      <div key={reading.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="font-medium">Readings at {new Date(reading.timestamp).toLocaleString()}</h4>
                          <Badge>{getTimeSince(reading.timestamp)}</Badge>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
                          <div className="flex items-center gap-2">
                            <Heart className={`h-4 w-4 ${getStatusColor(reading.heart_rate_status)}`} />
                            <span className="text-sm">HR: {reading.heart_rate} bpm</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className={`h-4 w-4 ${getStatusColor(reading.blood_pressure_status)}`} />
                            <span className="text-sm">BP: {reading.blood_pressure_systolic}/{reading.blood_pressure_diastolic}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Thermometer className={`h-4 w-4 ${getStatusColor(reading.temperature_status)}`} />
                            <span className="text-sm">Temp: {reading.temperature}°C</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Droplets className={`h-4 w-4 ${getStatusColor(reading.blood_oxygen_status)}`} />
                            <span className="text-sm">SpO₂: {reading.blood_oxygen}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {vitalsHistory.length === 0 && (
                      <div className="flex h-[300px] items-center justify-center">
                        <p className="text-muted-foreground">No vital signs data available</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Medications Tab */}
          <TabsContent value="medications" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Current Medications</CardTitle>
                  <CardDescription>Active prescriptions</CardDescription>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Medication
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {["Lisinopril", "Metformin", "Aspirin", "Atorvastatin"].map((med, i) => (
                    <Card key={i}>
                      <CardHeader className="flex flex-row items-center space-y-0">
                        <div className="flex-1">
                          <CardTitle>{med}</CardTitle>
                          <CardDescription>{["10mg", "500mg", "81mg", "20mg"][i]} - {["Once daily", "Twice daily", "Once daily", "Once daily"][i]}</CardDescription>
                        </div>
                        <Pill className="h-5 w-5 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Last Administered</span>
                            <span className="text-sm font-medium">{["Today, 8:00 AM", "Yesterday, 8:00 PM", "Today, 8:00 AM", "Today, 8:00 AM"][i]}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Adherence Rate</span>
                            <span className="text-sm font-medium">{["98%", "95%", "100%", "92%"][i]}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Next Dose</span>
                            <span className="text-sm font-medium">{["Tomorrow, 8:00 AM", "Today, 8:00 PM", "Tomorrow, 8:00 AM", "Tomorrow, 8:00 AM"][i]}</span>
                          </div>
                          
                          <Button className="mt-2 w-full" variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Medication History</CardTitle>
                <CardDescription>Past medication administrations</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                        <div>
                          <p className="font-medium">{
                            ["Lisinopril 10mg", "Metformin 500mg", "Aspirin 81mg", "Atorvastatin 20mg"][i % 4]
                          }</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{
                              i < 3 
                                ? "Today, " + ["8:00 AM", "12:00 PM", "8:00 PM"][i]
                                : i < 6 
                                  ? "Yesterday, " + ["8:00 AM", "12:00 PM", "8:00 PM"][i-3]
                                  : "2 days ago, " + ["8:00 AM", "8:00 PM"][i-6]
                            }</span>
                          </div>
                        </div>
                        <div className="ml-auto">
                          <Badge variant={i < 7 ? "default" : "destructive"}>
                            {i < 7 ? "Administered" : "Missed"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Patient Alerts</CardTitle>
                  <CardDescription>Health and device alerts</CardDescription>
                </div>
                <select
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  defaultValue="all"
                >
                  <option value="all">All Alerts</option>
                  <option value="active">Active</option>
                  <option value="resolved">Resolved</option>
                  <option value="critical">Critical Only</option>
                </select>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {patientAlerts.length > 0 ? (
                      patientAlerts.map((alert) => (
                        <div key={alert.id} className="rounded-lg border p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className={`h-4 w-4 ${alert.status === "Active" ? "text-red-500" : "text-amber-500"}`} />
                              <h4 className="font-medium">{alert.type}</h4>
                            </div>
                            <Badge variant={alert.status === "Active" ? "destructive" : "outline"}>
                              {alert.status}
                            </Badge>
                          </div>
                          <p className="mb-2 text-sm">{alert.message}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(alert.timestamp).toLocaleString()}
                            </span>
                            <span>({getTimeSince(alert.timestamp)})</span>
                          </div>
                          
                          {alert.status === "Active" && (
                            <div className="mt-4 flex gap-2">
                              <Button variant="outline" size="sm">Acknowledge</Button>
                              <Button size="sm">Respond</Button>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="flex h-[300px] items-center justify-center">
                        <p className="text-muted-foreground">No alerts found</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Care Plan Tab */}
          <TabsContent value="careplan" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Care Plan</CardTitle>
                  <CardDescription>Patient treatment plan</CardDescription>
                </div>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Care Goals</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <p>Maintain blood pressure below 140/90</p>
                        <Badge>High Priority</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <p>Achieve stable blood glucose levels</p>
                        <Badge>High Priority</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <p>Increase mobility and reduce fall risk</p>
                        <Badge variant="outline">Medium Priority</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Treatment Plan</h3>
                    <div className="rounded-md border p-4">
                      <p className="mb-4">
                        Patient is on a strict medication regimen to control hypertension and diabetes. 
                        Regular monitoring of vital signs, particularly blood pressure and blood glucose.
                        Weekly physical therapy sessions to improve mobility.
                      </p>
                      
                      <h4 className="mb-2 font-medium">Follow-up Schedule:</h4>
                      <ul className="mb-4 space-y-1">
                        <li>Weekly vital sign checks</li>
                        <li>Bi-weekly physical therapy</li>
                        <li>Monthly doctor consultation</li>
                      </ul>
                      
                      <h4 className="mb-2 font-medium">Special Instructions:</h4>
                      <p>
                        Monitor for signs of hypotension after medication. 
                        Ensure adequate fluid intake. 
                        Assist with ambulation as needed.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Care Team</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 rounded-md border p-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Dr. Sarah Johnson</p>
                          <p className="text-sm text-muted-foreground">Primary Care Physician</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-md border p-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>MP</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Mark Peterson</p>
                          <p className="text-sm text-muted-foreground">Physical Therapist</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 rounded-md border p-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>LW</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Lisa Wong</p>
                          <p className="text-sm text-muted-foreground">Nutritionist</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Patient Notes</CardTitle>
                  <CardDescription>Caregiver observations and updates</CardDescription>
                </div>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Card key={i}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>
                              {[
                                "Morning Check-in", 
                                "Medication Administration", 
                                "Physical Therapy Session",
                                "Blood Pressure Check",
                                "Evening Status Update"
                              ][i]}
                            </CardTitle>
                            <Badge variant="outline">
                              {i === 0 ? "Today" : i === 1 ? "Yesterday" : `${i} days ago`}
                            </Badge>
                          </div>
                          <CardDescription>
                            By {["Sarah Johnson", "Mark Peterson", "Lisa Wong", "Robert Chen", "Sarah Johnson"][i]}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>
                            {[
                              "Patient was responsive and alert during morning check-in. Vital signs stable. Appetite good, consumed full breakfast.",
                              "Administered morning medications as scheduled. Patient reported mild dizziness after taking Lisinopril.",
                              "Good session today. Patient showing improved mobility in left leg. Able to stand unassisted for 2 minutes.",
                              "Blood pressure slightly elevated at 145/85. Will monitor and report if trend continues.",
                              "Patient settled for the evening. Completed all daily activities and took medications as scheduled. Sleep pattern has been improving."
                            ][i]}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}


