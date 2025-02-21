import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, QrCode, Wifi, Battery, Signal, AlertTriangle } from "lucide-react"

export default function TechnicianDevicesPage() {
  return (
    <DashboardLayout userRole="technician">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Device Management</h2>
            <p className="text-muted-foreground">Monitor and maintain device health</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search devices..." className="pl-8 md:w-[300px]" />
            </div>
            <Button>
              <QrCode className="mr-2 h-4 w-4" /> Scan Device
            </Button>
          </div>
        </div>

        {/* Device Status Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {deviceStats.map((stat, index) => (
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

        {/* Device List */}
        <Card>
          <CardHeader>
            <CardTitle>Device Status</CardTitle>
            <CardDescription>Real-time status of all devices</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Battery</TableHead>
                  <TableHead>Signal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {devices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="font-medium">{device.id}</TableCell>
                    <TableCell>{device.type}</TableCell>
                    <TableCell>{device.location}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={device.battery} className="h-2 w-[60px]" />
                        <span className="text-sm">{device.battery}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Signal
                          className={`h-4 w-4 ${
                            device.signal > 70
                              ? "text-green-500"
                              : device.signal > 30
                                ? "text-yellow-500"
                                : "text-red-500"
                          }`}
                        />
                        <span className="text-sm">{device.signal}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          device.status === "Online"
                            ? "default"
                            : device.status === "Warning"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {device.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Diagnose
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

const deviceStats = [
  {
    title: "Total Devices",
    description: "Monitored devices",
    value: "156",
    detail: "12 need attention",
    icon: <Wifi className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Battery Status",
    description: "Average level",
    value: "82%",
    detail: "3 low battery",
    icon: <Battery className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Signal Strength",
    description: "Network status",
    value: "94%",
    detail: "Strong connection",
    icon: <Signal className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Alerts",
    description: "Active issues",
    value: "5",
    detail: "2 critical",
    icon: <AlertTriangle className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
]

const devices = [
  {
    id: "HM-2024-001",
    type: "Heart Monitor",
    location: "Room 101",
    battery: 85,
    signal: 92,
    status: "Online",
  },
  {
    id: "TS-2024-042",
    type: "Temperature Sensor",
    location: "Room 102",
    battery: 45,
    signal: 78,
    status: "Warning",
  },
  {
    id: "MS-2024-103",
    type: "Motion Sensor",
    location: "Room 103",
    battery: 92,
    signal: 95,
    status: "Online",
  },
  {
    id: "BP-2024-156",
    type: "Blood Pressure Monitor",
    location: "Room 104",
    battery: 15,
    signal: 25,
    status: "Critical",
  },
  {
    id: "WD-2024-089",
    type: "Wearable Device",
    location: "Room 105",
    battery: 78,
    signal: 88,
    status: "Online",
  },
]

