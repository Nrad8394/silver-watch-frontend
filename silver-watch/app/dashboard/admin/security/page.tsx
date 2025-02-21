import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Lock, AlertTriangle, UserCheck } from "lucide-react"

export default function SecurityPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Security Settings</h2>
          <p className="text-muted-foreground">Manage system security and access controls</p>
        </div>

        {/* Security Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {securityStats.map((stat, index) => (
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

        <div className="grid gap-6 md:grid-cols-2">
          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security Controls</CardTitle>
              <CardDescription>Configure system security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {securityControls.map((control, index) => (
                <div key={index} className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor={control.id}>{control.name}</Label>
                    <p className="text-sm text-muted-foreground">{control.description}</p>
                  </div>
                  <Switch id={control.id} checked={control.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Security Events */}
          <Card>
            <CardHeader>
              <CardTitle>Security Events</CardTitle>
              <CardDescription>Recent security-related activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityEvents.map((event, index) => (
                  <div key={index} className="flex items-center space-x-4 rounded-lg border p-4">
                    <div
                      className={`rounded-full p-2 ${
                        event.type === "warning"
                          ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
                          : event.type === "error"
                            ? "bg-red-100 text-red-600 dark:bg-red-900/30"
                            : "bg-green-100 text-green-600 dark:bg-green-900/30"
                      }`}
                    >
                      {event.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{event.message}</p>
                      <p className="text-sm text-muted-foreground">{event.timestamp}</p>
                    </div>
                    <Badge
                      variant={
                        event.type === "warning" ? "outline" : event.type === "error" ? "destructive" : "default"
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Access Logs */}
        <Card>
          <CardHeader>
            <CardTitle>Access Logs</CardTitle>
            <CardDescription>Recent system access attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>{log.ip}</TableCell>
                    <TableCell>{log.location}</TableCell>
                    <TableCell>{log.time}</TableCell>
                    <TableCell>
                      <Badge variant={log.status === "Success" ? "default" : "destructive"}>{log.status}</Badge>
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

const securityStats = [
  {
    title: "Security Score",
    description: "Overall system security",
    value: "92/100",
    detail: "Good standing",
    icon: <Shield className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Active Sessions",
    description: "Current users",
    value: "24",
    detail: "Last 24 hours",
    icon: <UserCheck className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Failed Attempts",
    description: "Login failures",
    value: "3",
    detail: "Last 24 hours",
    icon: <Lock className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Security Alerts",
    description: "Active warnings",
    value: "2",
    detail: "Requires attention",
    icon: <AlertTriangle className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
]

const securityControls = [
  {
    id: "2fa",
    name: "Two-Factor Authentication",
    description: "Require 2FA for all user accounts",
    enabled: true,
  },
  {
    id: "audit",
    name: "Security Audit Logging",
    description: "Log all security-related events",
    enabled: true,
  },
  {
    id: "session",
    name: "Auto Session Timeout",
    description: "Automatically log out inactive users",
    enabled: true,
  },
  {
    id: "password",
    name: "Strong Password Policy",
    description: "Enforce complex password requirements",
    enabled: true,
  },
]

const securityEvents = [
  {
    type: "error",
    message: "Multiple failed login attempts detected",
    timestamp: "10 minutes ago",
    status: "High Risk",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  {
    type: "warning",
    message: "New device login detected",
    timestamp: "1 hour ago",
    status: "Verified",
    icon: <UserCheck className="h-4 w-4" />,
  },
  {
    type: "success",
    message: "Security scan completed",
    timestamp: "2 hours ago",
    status: "Completed",
    icon: <Shield className="h-4 w-4" />,
  },
]

const accessLogs = [
  {
    user: "admin@example.com",
    ip: "192.168.1.1",
    location: "New York, US",
    time: "2 minutes ago",
    status: "Success",
  },
  {
    user: "user@example.com",
    ip: "192.168.1.2",
    location: "London, UK",
    time: "5 minutes ago",
    status: "Failed",
  },
  {
    user: "tech@example.com",
    ip: "192.168.1.3",
    location: "Toronto, CA",
    time: "10 minutes ago",
    status: "Success",
  },
]

