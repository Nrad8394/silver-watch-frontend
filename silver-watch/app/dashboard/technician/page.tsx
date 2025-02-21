import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Battery, WifiOff, Wrench, SignalHigh, Timer, CheckCircle2, XCircle } from "lucide-react"

export default function TechnicianDashboardPage() {
  return (
    <DashboardLayout userRole="technician">
      <div className="grid gap-6">
        {/* Device Alerts */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Device Alerts</h2>
          <div className="space-y-4">
            <Alert variant="destructive">
              <WifiOff className="h-5 w-5" />
              <AlertTitle>Connection Lost</AlertTitle>
              <AlertDescription>
                Device ID: 1234 has lost connection
                <div className="mt-2">
                  <Button size="sm" variant="destructive">
                    Investigate
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Battery className="h-5 w-5" />
              <AlertTitle>Low Battery</AlertTitle>
              <AlertDescription>
                3 devices require battery replacement
                <div className="mt-2">
                  <Button size="sm" variant="outline">
                    View Devices
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Device Stats */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
              <Wrench className="ml-auto h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">Active devices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <CardTitle className="text-sm font-medium">Signal Strength</CardTitle>
              <SignalHigh className="ml-auto h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">Average strength</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
              <Timer className="ml-auto h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Devices need attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <CardTitle className="text-sm font-medium">Battery Status</CardTitle>
              <Battery className="ml-auto h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">Average battery level</p>
            </CardContent>
          </Card>
        </section>

        {/* Device List */}
        <section className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMaintenance.map((maintenance, index) => (
                  <div key={index} className="flex items-center gap-4">
                    {maintenance.status === "Completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{maintenance.device}</p>
                      <p className="text-xs text-muted-foreground">{maintenance.action}</p>
                    </div>
                    <span className="ml-auto text-xs text-muted-foreground">{maintenance.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Calibration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calibrationStatus.map((status, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          status.status === "Calibrated"
                            ? "bg-green-500"
                            : status.status === "Due Soon"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <span className="text-sm font-medium">{status.device}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{status.status}</span>
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

const recentMaintenance = [
  { device: "Heart Rate Monitor #123", action: "Battery Replacement", status: "Completed", time: "2h ago" },
  { device: "Temperature Sensor #456", action: "Calibration", status: "Failed", time: "3h ago" },
  { device: "Motion Sensor #789", action: "Firmware Update", status: "Completed", time: "5h ago" },
  { device: "Blood Pressure Monitor #234", action: "Hardware Check", status: "Completed", time: "1d ago" },
]

const calibrationStatus = [
  { device: "Heart Rate Monitor #123", status: "Calibrated" },
  { device: "Temperature Sensor #456", status: "Needs Calibration" },
  { device: "Blood Pressure Monitor #789", status: "Due Soon" },
  { device: "Motion Sensor #012", status: "Calibrated" },
]

