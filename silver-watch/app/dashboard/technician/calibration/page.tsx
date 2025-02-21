import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function CalibrationPage() {
  return (
    <DashboardLayout userRole="technician">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Device Calibration</h2>
            <p className="text-muted-foreground">Calibrate and adjust device settings</p>
          </div>
          <Select defaultValue="hm-2024-001">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select device" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hm-2024-001">Heart Monitor #001</SelectItem>
              <SelectItem value="ts-2024-042">Temp Sensor #042</SelectItem>
              <SelectItem value="ms-2024-103">Motion Sensor #103</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Calibration Status */}
          <Card>
            <CardHeader>
              <CardTitle>Calibration Status</CardTitle>
              <CardDescription>Current device calibration metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {calibrationMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>{metric.name}</Label>
                    <Badge
                      variant={
                        metric.status === "Calibrated"
                          ? "default"
                          : metric.status === "Warning"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {metric.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={metric.accuracy} className="h-2" />
                    <span className="text-sm">{metric.accuracy}%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Last calibrated: {metric.lastCalibrated}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Calibration Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Calibration Controls</CardTitle>
              <CardDescription>Adjust device parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {calibrationControls.map((control, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{control.name}</Label>
                    <span className="text-sm">
                      {control.value}
                      {control.unit}
                    </span>
                  </div>
                  <Slider defaultValue={[control.value]} max={control.max} min={control.min} step={control.step} />
                  <p className="text-sm text-muted-foreground">{control.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {advancedSettings.map((setting, index) => (
                <div key={index} className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>{setting.name}</Label>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <Switch checked={setting.enabled} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Calibration History */}
          <Card>
            <CardHeader>
              <CardTitle>Calibration History</CardTitle>
              <CardDescription>Recent calibration activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calibrationHistory.map((entry, index) => (
                  <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{entry.action}</p>
                      <p className="text-sm text-muted-foreground">{entry.timestamp}</p>
                    </div>
                    <Badge variant="outline">{entry.result}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

const calibrationMetrics = [
  {
    name: "Sensor Accuracy",
    status: "Calibrated",
    accuracy: 98,
    lastCalibrated: "2 days ago",
  },
  {
    name: "Response Time",
    status: "Warning",
    accuracy: 85,
    lastCalibrated: "5 days ago",
  },
  {
    name: "Data Precision",
    status: "Calibrated",
    accuracy: 95,
    lastCalibrated: "1 day ago",
  },
]

const calibrationControls = [
  {
    name: "Sensitivity",
    value: 75,
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    description: "Adjust sensor sensitivity level",
  },
  {
    name: "Threshold",
    value: 25,
    unit: "ms",
    min: 10,
    max: 100,
    step: 5,
    description: "Set response threshold",
  },
  {
    name: "Sample Rate",
    value: 50,
    unit: "Hz",
    min: 10,
    max: 100,
    step: 10,
    description: "Configure sampling frequency",
  },
]

const advancedSettings = [
  {
    name: "Auto-Calibration",
    description: "Enable automatic calibration",
    enabled: true,
  },
  {
    name: "High Precision Mode",
    description: "Increase measurement precision",
    enabled: false,
  },
  {
    name: "Error Compensation",
    description: "Apply error correction algorithms",
    enabled: true,
  },
]

const calibrationHistory = [
  {
    action: "Full System Calibration",
    timestamp: "Today, 10:30 AM",
    result: "Success",
  },
  {
    action: "Sensitivity Adjustment",
    timestamp: "Yesterday, 2:15 PM",
    result: "Adjusted",
  },
  {
    action: "Threshold Calibration",
    timestamp: "2 days ago",
    result: "Success",
  },
]

