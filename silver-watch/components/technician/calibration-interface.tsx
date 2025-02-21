"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Settings2, Save, RotateCcw, AlertTriangle, CheckCircle2, BarChart3 } from "lucide-react"
import type { Device, CalibrationData } from "@/types/technician"

interface CalibrationInterfaceProps {
  device: Device
  calibrationData: CalibrationData
  onSaveCalibration: (data: Partial<CalibrationData>) => Promise<void>
  onResetCalibration: () => Promise<void>
}

export function CalibrationInterface({
  device,
  calibrationData,
  onSaveCalibration,
  onResetCalibration,
}: CalibrationInterfaceProps) {
  const [isCalibrating, setIsCalibrating] = useState(false)
  const [parameters, setParameters] = useState(calibrationData.parameters)
  const [autoCalibration, setAutoCalibration] = useState(true)

  const handleParameterChange = (param: string, value: number) => {
    setParameters((prev) => ({
      ...prev,
      [param]: value,
    }))
  }

  const handleSaveCalibration = async () => {
    setIsCalibrating(true)
    try {
      await onSaveCalibration({
        ...calibrationData,
        parameters,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Calibration failed:", error)
    } finally {
      setIsCalibrating(false)
    }
  }

  const handleResetCalibration = async () => {
    try {
      await onResetCalibration()
      setParameters(calibrationData.parameters)
    } catch (error) {
      console.error("Reset failed:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Device Calibration</h2>
          <p className="text-muted-foreground">
            {device.name} - {device.serialNumber}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleResetCalibration} disabled={isCalibrating}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSaveCalibration} disabled={isCalibrating}>
            <Save className="mr-2 h-4 w-4" />
            Save Calibration
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Calibration Settings</CardTitle>
                <CardDescription>Adjust device parameters</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={autoCalibration} onCheckedChange={setAutoCalibration} id="auto-calibration" />
                <Label htmlFor="auto-calibration">Auto-Calibration</Label>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(parameters).map(([param, value]) => (
              <div key={param} className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>{param}</Label>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => handleParameterChange(param, Number(e.target.value))}
                    className="w-24"
                  />
                </div>
                <Slider
                  value={[value]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([newValue]) => handleParameterChange(param, newValue)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calibration Status</CardTitle>
            <CardDescription>Current calibration metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Accuracy</span>
                <Badge
                  variant={
                    calibrationData.accuracy >= 95
                      ? "default"
                      : calibrationData.accuracy >= 85
                        ? "warning"
                        : "destructive"
                  }
                >
                  {calibrationData.accuracy}%
                </Badge>
              </div>
              <Progress value={calibrationData.accuracy} className="h-2" />
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Last Calibration</span>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-muted-foreground">Performed by: {calibrationData.performedBy}</p>
                <p className="text-sm text-muted-foreground">
                  Date: {new Date(calibrationData.timestamp).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  Valid until: {new Date(calibrationData.validUntil).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {calibrationMetrics.map((metric) => (
                <div key={metric.name} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    {metric.status === "optimal" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : metric.status === "warning" ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="font-medium">{metric.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{metric.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const calibrationMetrics = [
  {
    name: "Sensitivity",
    value: "High",
    status: "optimal" as const,
  },
  {
    name: "Response Time",
    value: "45ms",
    status: "warning" as const,
  },
  {
    name: "Precision",
    value: "±0.1",
    status: "normal" as const,
  },
  {
    name: "Drift Rate",
    value: "0.02%/hour",
    status: "optimal" as const,
  },
]

