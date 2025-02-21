import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Activity, Thermometer, Droplets, Bell, PillIcon as Pills, MessageCircle } from "lucide-react"

export default function PatientDashboardPage() {
  return (
    <DashboardLayout userRole="patient">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">My Health Dashboard</h2>
            <p className="text-muted-foreground">Monitor your health status and daily activities</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Alerts
          </Button>
        </div>

        {/* Emergency Alert */}
        <Alert variant="destructive">
          <Bell className="h-4 w-4" />
          <AlertTitle>Medication Reminder</AlertTitle>
          <AlertDescription>
            It&apos;s time to take your blood pressure medication.
            <div className="mt-2">
              <Button size="sm" variant="destructive">
                Mark as Taken
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        {/* Vital Signs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {vitalSigns.map((vital, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center space-y-0">
                <div>
                  <CardTitle className="text-sm font-medium">{vital.name}</CardTitle>
                  <CardDescription>{vital.time}</CardDescription>
                </div>
                {vital.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {vital.value}
                  <span className="text-sm font-normal text-muted-foreground"> {vital.unit}</span>
                </div>
                <Badge
                  variant={
                    vital.status === "Normal" ? "default" : vital.status === "Warning" ? "secondary" : "destructive"
                  }
                >
                  {vital.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Schedule</CardTitle>
              <CardDescription>Your upcoming activities</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {schedule.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                      {item.icon}
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.time}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Activity Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Activity</CardTitle>
              <CardDescription>Your progress today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {activityMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {metric.icon}
                      <span className="text-sm font-medium">{metric.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {metric.value} / {metric.target} {metric.unit}
                    </span>
                  </div>
                  <Progress value={(metric.value / metric.target) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

const vitalSigns = [
  {
    name: "Heart Rate",
    value: 72,
    unit: "bpm",
    time: "Last updated 5m ago",
    status: "Normal",
    icon: <Heart className="ml-auto h-4 w-4 text-muted-foreground" />,
  },
  {
    name: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    time: "Last updated 5m ago",
    status: "Normal",
    icon: <Activity className="ml-auto h-4 w-4 text-muted-foreground" />,
  },
  {
    name: "Temperature",
    value: 37.2,
    unit: "°C",
    time: "Last updated 5m ago",
    status: "Normal",
    icon: <Thermometer className="ml-auto h-4 w-4 text-muted-foreground" />,
  },
  {
    name: "Blood Oxygen",
    value: 98,
    unit: "%",
    time: "Last updated 5m ago",
    status: "Normal",
    icon: <Droplets className="ml-auto h-4 w-4 text-muted-foreground" />,
  },
]

const schedule = [
  {
    title: "Blood Pressure Medication",
    time: "9:00 AM",
    icon: <Pills className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Video Call with Dr. Smith",
    time: "11:30 AM",
    icon: <MessageCircle className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Physical Therapy Session",
    time: "2:00 PM",
    icon: <Activity className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Evening Medication",
    time: "7:00 PM",
    icon: <Pills className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Daily Health Check",
    time: "8:00 PM",
    icon: <Heart className="h-4 w-4 text-muted-foreground" />,
  },
]

const activityMetrics = [
  {
    name: "Steps",
    value: 6500,
    target: 10000,
    unit: "steps",
    icon: <Activity className="h-4 w-4 text-muted-foreground" />,
  },
  {
    name: "Exercise",
    value: 25,
    target: 30,
    unit: "min",
    icon: <Activity className="h-4 w-4 text-muted-foreground" />,
  },
  {
    name: "Heart Rate Zone",
    value: 45,
    target: 60,
    unit: "min",
    icon: <Heart className="h-4 w-4 text-muted-foreground" />,
  },
]

