import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, PenToolIcon as Tool, AlertTriangle, CalendarIcon } from "lucide-react"

export default function MaintenancePage() {
  return (
    <DashboardLayout userRole="technician">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Maintenance</h2>
            <p className="text-muted-foreground">Schedule and track maintenance tasks</p>
          </div>
          <Button>
            <Tool className="mr-2 h-4 w-4" /> Create Task
          </Button>
        </div>

        {/* Maintenance Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {maintenanceStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center space-y-0">
                <div>
                  <CardTitle>{stat.title}</CardTitle>
                  <CardDescription>{stat.description}</CardDescription>
                </div>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <Tabs defaultValue="upcoming" className="space-y-4">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="inProgress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge>{task.priority}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {task.scheduledFor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tool className="h-4 w-4" />
                          {task.deviceId}
                        </span>
                      </div>
                    </div>
                    <Button>Start Task</Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="inProgress" className="space-y-4">
              {inProgressTasks.map((task, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge variant="secondary">In Progress</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                      <Button variant="outline">Complete</Button>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedTasks.map((task, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Completed on {task.completedOn}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
                <CardDescription>Maintenance calendar</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={new Date()} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const maintenanceStats = [
  {
    title: "Scheduled",
    description: "Upcoming tasks",
    value: "12",
    detail: "Next 7 days",
    icon: <CalendarIcon className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "In Progress",
    description: "Active tasks",
    value: "4",
    detail: "2 high priority",
    icon: <Clock className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Completed",
    description: "This week",
    value: "18",
    detail: "On schedule",
    icon: <CheckCircle2 className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Overdue",
    description: "Delayed tasks",
    value: "3",
    detail: "Needs attention",
    icon: <AlertTriangle className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
]

const upcomingTasks = [
  {
    title: "Quarterly Calibration",
    description: "Perform routine calibration on heart rate monitors",
    priority: "High",
    scheduledFor: "Tomorrow, 10:00 AM",
    deviceId: "HM-2024-001",
  },
  {
    title: "Battery Replacement",
    description: "Replace batteries in motion sensors",
    priority: "Medium",
    scheduledFor: "Wed, 2:00 PM",
    deviceId: "MS-2024-042",
  },
  {
    title: "Firmware Update",
    description: "Update system firmware on temperature sensors",
    priority: "Low",
    scheduledFor: "Fri, 11:00 AM",
    deviceId: "TS-2024-103",
  },
]

const inProgressTasks = [
  {
    title: "System Diagnostics",
    description: "Running full system diagnostic check",
    progress: 75,
  },
  {
    title: "Sensor Calibration",
    description: "Calibrating blood pressure monitors",
    progress: 45,
  },
]

const completedTasks = [
  {
    title: "Network Maintenance",
    description: "Optimized network connectivity for all devices",
    completedOn: "Mon, 10:30 AM",
  },
  {
    title: "Hardware Inspection",
    description: "Completed monthly hardware inspection",
    completedOn: "Sun, 3:15 PM",
  },
]

