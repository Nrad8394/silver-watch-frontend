import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Users, Shield, Wrench, AlertTriangle } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="grid gap-6">
        {/* System Alerts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">System Status</h2>
          <Alert variant="destructive">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>System Update Required</AlertTitle>
            <AlertDescription>
              Security update available for 15 devices
              <div className="mt-2">
                <Button size="sm" variant="outline">
                  Schedule Update
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </section>

        {/* Quick Stats */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="ml-auto h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+7 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
              <Wrench className="ml-auto h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">567</div>
              <p className="text-xs text-muted-foreground">98% uptime</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <CardTitle className="text-sm font-medium">Security Events</CardTitle>
              <Shield className="ml-auto h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <CardTitle className="text-sm font-medium">System Load</CardTitle>
              <AlertTriangle className="ml-auto h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45%</div>
              <p className="text-xs text-muted-foreground">Normal range</p>
            </CardContent>
          </Card>
        </section>

        {/* Recent Activity */}
        <section className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent User Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUserActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.status === "Healthy"
                            ? "bg-green-500"
                            : item.status === "Warning"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.status}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  )
}

const recentUserActivity = [
  { action: "New caregiver registered", time: "5 minutes ago" },
  { action: "Device assignment updated", time: "10 minutes ago" },
  { action: "System settings modified", time: "15 minutes ago" },
  { action: "Backup completed", time: "1 hour ago" },
]

const systemHealth = [
  { name: "Database", status: "Healthy" },
  { name: "API Services", status: "Healthy" },
  { name: "Monitoring System", status: "Warning" },
  { name: "Backup System", status: "Healthy" },
]

