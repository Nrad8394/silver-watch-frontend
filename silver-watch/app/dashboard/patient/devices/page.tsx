import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Battery, Signal, Wifi, AlertTriangle, MapPin } from "lucide-react"

export default function DevicesPage() {
  return (
    <DashboardLayout userRole="patient">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Connected Devices</h2>
          <p className="text-muted-foreground">Monitor your health devices and their status</p>
        </div>

        {/* Alerts */}
        {deviceAlerts.map((alert, index) => (
          <Alert key={index} variant={alert.type}>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        ))}

        {/* Device Status Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {deviceStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center space-y-0">
                <div>
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
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

        {/* Connected Devices */}
        <div className="grid gap-4 md:grid-cols-2">
          {connectedDevices.map((device, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{device.name}</CardTitle>
                    <CardDescription>{device.id}</CardDescription>
                  </div>
                  <Badge variant={getDeviceStatusVariant(device.status)}>{device.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Battery</span>
                    <span>{device.battery}%</span>
                  </div>
                  <Progress value={device.battery} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Signal Strength</span>
                    <span>{device.signal}%</span>
                  </div>
                  <Progress value={device.signal} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Synced</span>
                  <span>{device.lastSync}</span>
                </div>

                {device.location && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Location</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{device.location}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

const deviceAlerts = [
  {
    type: "warning" as const,
    title: "Low Battery Warning",
    description: "Heart Rate Monitor battery is below 20%. Please charge soon.",
  },
]

const deviceStats = [
  {
    title: "Connected Devices",
    description: "Active devices",
    value: "4",
    detail: "All devices online",
    icon: <Wifi className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Battery Status",
    description: "Average level",
    value: "76%",
    detail: "1 device needs charging",
    icon: <Battery className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Signal Strength",
    description: "Connection quality",
    value: "92%",
    detail: "Strong connection",
    icon: <Signal className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Data Sync",
    description: "Last update",
    value: "2m",
    detail: "Real-time sync active",
    icon: <AlertTriangle className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
]

const connectedDevices = [
  {
    name: "Heart Rate Monitor",
    id: "HRM-2024-001",
    status: "Online",
    battery: 15,
    signal: 95,
    lastSync: "2 minutes ago",
    location: "Bedroom",
  },
  {
    name: "Blood Pressure Monitor",
    id: "BPM-2024-002",
    status: "Online",
    battery: 85,
    signal: 90,
    lastSync: "5 minutes ago",
    location: "Living Room",
  },
  {
    name: "Fall Detection Sensor",
    id: "FDS-2024-003",
    status: "Online",
    battery: 92,
    signal: 88,
    lastSync: "1 minute ago",
    location: "Wearable",
  },
  {
    name: "Temperature Sensor",
    id: "TMP-2024-004",
    status: "Online",
    battery: 78,
    signal: 85,
    lastSync: "3 minutes ago",
    location: "Bedroom",
  },
]

function getDeviceStatusVariant(status: string) {
  switch (status) {
    case "Online":
      return "default"
    case "Offline":
      return "destructive"
    case "Warning":
      return "warning"
    default:
      return "secondary"
  }
}

