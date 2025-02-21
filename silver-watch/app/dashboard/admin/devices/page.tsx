import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, Wifi, Battery, AlertTriangle, Signal, Settings } from "lucide-react"

export default function DevicesPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Device Management</h2>
            <p className="text-muted-foreground">Monitor and manage all system devices</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search devices..." className="pl-8 md:w-[300px]" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Device
            </Button>
          </div>
        </div>

        {/* System Status */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {systemStats.map((stat, index) => (
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

        {/* Device Categories */}
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Device Categories</CardTitle>
                  <CardDescription>Overview by device type</CardDescription>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Devices</SelectItem>
                    <SelectItem value="monitors">Health Monitors</SelectItem>
                    <SelectItem value="sensors">Sensors</SelectItem>
                    <SelectItem value="wearables">Wearables</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {deviceCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">{category.name}</div>
                        <div className="text-xs text-muted-foreground">{category.devices} devices</div>
                      </div>
                      <Badge variant={category.status === "Operational" ? "default" : "destructive"}>
                        {category.status}
                      </Badge>
                    </div>
                    <Progress value={category.uptime} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {devices.map((device, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{device.name}</CardTitle>
                      <CardDescription>{device.id}</CardDescription>
                    </div>
                    <Badge variant={device.status === "Online" ? "default" : "secondary"}>{device.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Signal className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Signal</span>
                      </div>
                      <span className="text-sm font-medium">{device.signal}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Battery className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Battery</span>
                      </div>
                      <span className="text-sm font-medium">{device.battery}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Last Maintenance</span>
                      </div>
                      <span className="text-sm font-medium">{device.lastMaintenance}</span>
                    </div>
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const systemStats = [
  {
    title: "Total Devices",
    description: "Active in system",
    value: "245",
    detail: "+12 this month",
    icon: <Wifi className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Battery Alerts",
    description: "Devices needing attention",
    value: "8",
    detail: "3 critical",
    icon: <Battery className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Connectivity",
    description: "Average signal strength",
    value: "92%",
    detail: "Good condition",
    icon: <Signal className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Issues",
    description: "Requiring maintenance",
    value: "5",
    detail: "2 high priority",
    icon: <AlertTriangle className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
]

const deviceCategories = [
  {
    name: "Health Monitors",
    devices: 86,
    status: "Operational",
    uptime: 98,
  },
  {
    name: "Motion Sensors",
    devices: 45,
    status: "Operational",
    uptime: 95,
  },
  {
    name: "Environmental Sensors",
    devices: 32,
    status: "Partial Outage",
    uptime: 85,
  },
  {
    name: "Wearable Devices",
    devices: 67,
    status: "Operational",
    uptime: 92,
  },
]

const devices = [
  {
    name: "Silver Watch",
    id: "HM-2024-001",
    status: "Online",
    signal: 95,
    battery: 82,
    lastMaintenance: "2 days ago",
  },
  {
    name: "Motion Sensor",
    id: "MS-2024-042",
    status: "Online",
    signal: 88,
    battery: 74,
    lastMaintenance: "5 days ago",
  },
  {
    name: "Environmental Sensor",
    id: "ES-2024-103",
    status: "Offline",
    signal: 0,
    battery: 45,
    lastMaintenance: "1 week ago",
  },
  {
    name: "Wearable Device",
    id: "WD-2024-156",
    status: "Online",
    signal: 92,
    battery: 95,
    lastMaintenance: "1 day ago",
  },
  {
    name: "Temperature Sensor",
    id: "TS-2024-089",
    status: "Online",
    signal: 90,
    battery: 88,
    lastMaintenance: "3 days ago",
  },
  {
    name: "Fall Detection Sensor",
    id: "FD-2024-067",
    status: "Online",
    signal: 94,
    battery: 79,
    lastMaintenance: "4 days ago",
  },
]

