'use client'
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Activity, Thermometer, Droplets, Download, FileText } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { VitalSigns } from "@/types/health"
import { useApi } from "@/hooks/useApi"
import ApiService from "@/handler/ApiService"
import { handleApiError } from "@/utils/api"
export default function HealthPage() {
  const { useFetchData } = useApi<VitalSigns, VitalSigns>(ApiService.VITAL_SIGNS_URL)
  const { data:vitals, isLoading, error ,refetch } = useFetchData(1,{ordering:'-timestamp'})
  const latestVitals = vitals?.results[0] || {
    heart_rate: 0,
    heart_rate_status: "",
    blood_pressure_systolic: 0,
    blood_pressure_diastolic: 0,
    blood_pressure_status: "",
    temperature: 0,
    temperature_status: "",
    blood_oxygen: 0,
    blood_oxygen_status: "",
  }
  if (isLoading) return <p>Loading...</p>

  if (error) {
    handleApiError(error)
    return <p>Error</p>
  }

  // add refetch logic after every 5 sec
  setInterval(() => {
    refetch()
  }, 5000)
  
  return (
    <DashboardLayout userRole="patient">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Health Records</h2>
            <p className="text-muted-foreground">View your health history and trends</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="7d">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="vitals" className="space-y-4">
          <TabsList>
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="vitals" className="space-y-4">
            {!latestVitals ? (
              <Card>
                <CardContent>
                  <p>No vital signs data available</p>
                </CardContent>
              </Card>
            ):(
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Heart Rate Card */}
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0">
                  <div>
                  <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                  <CardDescription>60-100 bpm</CardDescription>
                  </div>
                  <Heart className="ml-auto h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                  {latestVitals.heart_rate}
                  <span className="text-sm font-normal text-muted-foreground"> bpm</span>
                  </div>
                  <div className="flex items-center gap-2">
                  <Badge variant={latestVitals.heart_rate_status === "Normal" ? "outline" : "destructive"}>
                    {latestVitals.heart_rate_status}
                  </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Blood Pressure Card */}
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0">
                  <div>
                  <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                  <CardDescription>90/60-120/80 mmHg</CardDescription>
                  </div>
                  <Activity className="ml-auto h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                  {latestVitals.blood_pressure_systolic}/{latestVitals.blood_pressure_diastolic}
                  <span className="text-sm font-normal text-muted-foreground"> mmHg</span>
                  </div>
                  <div className="flex items-center gap-2">
                  <Badge variant={latestVitals.blood_pressure_status === "Normal" ? "outline" : "destructive"}>
                    {latestVitals.blood_pressure_status}
                  </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Temperature Card */}
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0">
                  <div>
                  <CardTitle className="text-sm font-medium">Temperature</CardTitle>
                  <CardDescription>36.5-37.5°C</CardDescription>
                  </div>
                  <Thermometer className="ml-auto h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                  {latestVitals.temperature}
                  <span className="text-sm font-normal text-muted-foreground"> °C</span>
                  </div>
                  <div className="flex items-center gap-2">
                  <Badge variant={latestVitals.temperature_status === "Normal" ? "outline" : "destructive"}>
                    {latestVitals.temperature_status}
                  </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Blood Oxygen Card */}
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0">
                  <div>
                  <CardTitle className="text-sm font-medium">Blood Oxygen</CardTitle>
                  <CardDescription>95-100%</CardDescription>
                  </div>
                  <Droplets className="ml-auto h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                  {latestVitals.blood_oxygen}
                  <span className="text-sm font-normal text-muted-foreground"> %</span>
                  </div>
                  <div className="flex items-center gap-2">
                  <Badge variant={latestVitals.blood_oxygen_status === "Normal" ? "outline" : "destructive"}>
                    {latestVitals.blood_oxygen_status}
                  </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
            )}
            
            <Card>
              <CardHeader>
              <CardTitle>Vital Signs Trends</CardTitle>
              <CardDescription>7-day history</CardDescription>
              </CardHeader>
                <CardContent>
                <div className="mb-4">
                  <Select defaultValue="7d" onValueChange={(value) => {
                  const days = parseInt(value.replace('d', ''));
                  const hours = value.includes('h') ? parseInt(value.replace('h', '')) : null;
                  
                  // Calculate date range based on selection
                  const endDate = new Date().toISOString();
                  let startDate;
                  
                  if (hours) {
                    startDate = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
                  } else {
                    startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
                  }
                  
                  // Refetch with date filter
                  refetch({
                    timestamp_after: startDate,
                    timestamp_before: endDate,
                    ordering: '-timestamp'
                  });
                  }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                  </SelectContent>
                  </Select>
                </div>
                
                {vitals?.results && vitals.results.length > 0 ? (
                  <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    data={vitals.results.slice(0, 10).reverse()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="timestamp" 
                      tickFormatter={(timestamp) => {
                      const date = new Date(timestamp);
                      return `${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
                      }}
                      label={{ value: 'Time', position: 'insideBottom', offset: -40 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
                      formatter={(value, name) => {
                      const units = {
                        heart_rate: 'bpm',
                        blood_pressure_systolic: 'mmHg',
                        blood_pressure_diastolic: 'mmHg',
                        temperature: '°C',
                        blood_oxygen: '%'
                      };
                      return [`${value} ${units[name as keyof typeof units]}`, name];
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
                </div>
              ) : (
                <div className="h-[400px] flex items-center justify-center border rounded-lg">
                <p className="text-muted-foreground">No data available for chart</p>
                </div>
              )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Summary</CardTitle>
                <CardDescription>Weekly overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {activitySummary.map((activity, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {activity.icon}
                        <span className="font-medium">{activity.name}</span>
                      </div>
                      <Badge variant="secondary">{activity.average}</Badge>
                    </div>
                    <div className="h-[100px] w-full border rounded-lg flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Activity chart placeholder</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medication History</CardTitle>
                <CardDescription>Track your medications</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {medicationHistory.map((entry, index) => (
                      <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{entry.medication}</h4>
                            <Badge
                              variant={
                                entry.status === "Taken"
                                  ? "default"
                                  : entry.status === "Missed"
                                    ? "destructive"
                                    : "secondary"
                              }
                            >
                              {entry.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {entry.dosage} - {entry.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medical Reports</CardTitle>
                <CardDescription>View your health reports</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {medicalReports.map((report, index) => (
                      <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">{report.date}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
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


const activitySummary = [
  {
    name: "Daily Steps",
    average: "8,500 steps/day",
    icon: <Activity className="h-4 w-4 text-muted-foreground" />,
  },
  {
    name: "Active Minutes",
    average: "45 min/day",
    icon: <Activity className="h-4 w-4 text-muted-foreground" />,
  },
  {
    name: "Heart Rate Zones",
    average: "30 min/day",
    icon: <Heart className="h-4 w-4 text-muted-foreground" />,
  },
]

const medicationHistory = [
  {
    medication: "Lisinopril",
    dosage: "10mg",
    time: "Today, 9:00 AM",
    status: "Taken",
  },
  {
    medication: "Metformin",
    dosage: "500mg",
    time: "Today, 8:00 AM",
    status: "Taken",
  },
  {
    medication: "Aspirin",
    dosage: "81mg",
    time: "Yesterday, 9:00 PM",
    status: "Missed",
  },
  {
    medication: "Lisinopril",
    dosage: "10mg",
    time: "Yesterday, 9:00 AM",
    status: "Taken",
  },
  {
    medication: "Metformin",
    dosage: "500mg",
    time: "Yesterday, 8:00 AM",
    status: "Taken",
  },
]

const medicalReports = [
  {
    title: "Annual Physical Examination",
    date: "March 15, 2024",
  },
  {
    title: "Blood Work Results",
    date: "March 10, 2024",
  },
  {
    title: "Cardiology Consultation",
    date: "February 28, 2024",
  },
  {
    title: "ECG Report",
    date: "February 28, 2024",
  },
  {
    title: "Medication Review",
    date: "February 15, 2024",
  },
]

