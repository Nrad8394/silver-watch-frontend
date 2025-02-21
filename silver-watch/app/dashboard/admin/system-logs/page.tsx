import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Download, AlertTriangle, Shield, LogIn, Settings, FileText, Database } from "lucide-react"

export default function SystemLogsPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">System Logs</h2>
            <p className="text-muted-foreground">Monitor system activities and security events</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Log type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Logs</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="user">User Activity</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search logs..." className="pl-8 w-[200px]" />
            </div>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export Logs
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Log Summary */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {logSummary.map((summary, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center space-y-0">
                  <div>
                    <CardTitle className="text-sm font-medium">{summary.title}</CardTitle>
                    <CardDescription>{summary.period}</CardDescription>
                  </div>
                  {summary.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{summary.count}</div>
                  <p className="text-xs text-muted-foreground">{summary.trend}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Log Entries */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Log Entries</CardTitle>
              <CardDescription>System events and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {logEntries.map((entry, index) => (
                    <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                      <div
                        className={`rounded-full p-2 ${
                          entry.level === "error"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30"
                            : entry.level === "warning"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                              : "bg-green-100 text-green-700 dark:bg-green-900/30"
                        }`}
                      >
                        {entry.icon}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{entry.message}</p>
                          <Badge variant={getBadgeVariant(entry.level)}>{entry.level}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>ID: {entry.id}</span>
                          <span>User: {entry.user}</span>
                          <span>IP: {entry.ip}</span>
                          <span>Time: {entry.timestamp}</span>
                        </div>
                        {entry.details && <p className="text-sm text-muted-foreground">{entry.details}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

const logSummary = [
  {
    title: "Total Events",
    period: "Last 24 hours",
    count: "1,234",
    trend: "+12% from previous day",
    icon: <Database className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "Security Events",
    period: "Last 24 hours",
    count: "45",
    trend: "-5% from previous day",
    icon: <Shield className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "System Events",
    period: "Last 24 hours",
    count: "892",
    trend: "+8% from previous day",
    icon: <Settings className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
  {
    title: "User Events",
    period: "Last 24 hours",
    count: "297",
    trend: "+15% from previous day",
    icon: <LogIn className="ml-auto h-5 w-5 text-muted-foreground" />,
  },
]

const logEntries = [
  {
    id: "LOG-001",
    level: "error",
    message: "Failed login attempt detected",
    user: "unknown",
    ip: "192.168.1.1",
    timestamp: "2024-03-20 14:30:00",
    details: "Multiple failed attempts from same IP address",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  {
    id: "LOG-002",
    level: "warning",
    message: "System update available",
    user: "system",
    ip: "internal",
    timestamp: "2024-03-20 14:25:00",
    details: "New security patches available for installation",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    id: "LOG-003",
    level: "info",
    message: "User session started",
    user: "john.doe@example.com",
    ip: "192.168.1.100",
    timestamp: "2024-03-20 14:20:00",
    icon: <LogIn className="h-4 w-4" />,
  },
  {
    id: "LOG-004",
    level: "info",
    message: "Report generated",
    user: "sarah.smith@example.com",
    ip: "192.168.1.101",
    timestamp: "2024-03-20 14:15:00",
    icon: <FileText className="h-4 w-4" />,
  },
]

function getBadgeVariant(level: string) {
  switch (level) {
    case "error":
      return "destructive"
    case "warning":
      return "outline"
    default:
      return "secondary"
  }
}

