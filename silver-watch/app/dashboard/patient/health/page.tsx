import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Activity, Thermometer, Droplets, Download, FileText, TrendingUp } from "lucide-react"

export default function HealthPage() {
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {vitalTrends.map((vital, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center space-y-0">
                    <div>
                      <CardTitle className="text-sm font-medium">{vital.name}</CardTitle>
                      <CardDescription>{vital.range}</CardDescription>
                    </div>
                    {vital.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {vital.average}
                      <span className="text-sm font-normal text-muted-foreground"> {vital.unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500">{vital.trend}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Vital Signs Trends</CardTitle>
                <CardDescription>7-day history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-lg">
                  <p className="text-muted-foreground">Chart placeholder</p>
                </div>
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

const vitalTrends = [
  {
    name: "Heart Rate",
    average: 75,
    unit: "bpm",
    range: "60-100 bpm",
    trend: "+2% vs last week",
    icon: <Heart className="ml-auto h-4 w-4 text-muted-foreground" />,
  },
  {
    name: "Blood Pressure",
    average: "118/78",
    unit: "mmHg",
    range: "90/60-120/80 mmHg",
    trend: "-3% vs last week",
    icon: <Activity className="ml-auto h-4 w-4 text-muted-foreground" />,
  },
  {
    name: "Temperature",
    average: 36.9,
    unit: "°C",
    range: "36.5-37.5°C",
    trend: "Stable",
    icon: <Thermometer className="ml-auto h-4 w-4 text-muted-foreground" />,
  },
  {
    name: "Blood Oxygen",
    average: 97,
    unit: "%",
    range: "95-100%",
    trend: "+1% vs last week",
    icon: <Droplets className="ml-auto h-4 w-4 text-muted-foreground" />,
  },
]

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

