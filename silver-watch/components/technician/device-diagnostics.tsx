"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  AlertTriangle,
  Battery,
  CheckCircle2,
  Signal,
  Wifi,
  XCircle,
  RefreshCw,
  Download,
} from "lucide-react"
import type { Device, DiagnosticResult } from "@/types/technician"

interface DeviceDiagnosticsProps {
  device: Device
  diagnosticHistory: DiagnosticResult[]
  onRunDiagnostic: () => Promise<void>
  onExportResults: () => Promise<void>
}

export function DeviceDiagnostics({
  device,
  diagnosticHistory,
  onRunDiagnostic,
  onExportResults,
}: DeviceDiagnosticsProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleRunDiagnostic = async () => {
    setIsRunning(true)
    setProgress(0)

    // Simulate diagnostic progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)

    try {
      await onRunDiagnostic()
    } catch (error) {
      console.error("Diagnostic failed:", error)
    } finally {
      clearInterval(interval)
      setIsRunning(false)
      setProgress(0)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Device Diagnostics</h2>
          <p className="text-muted-foreground">
            {device.name} - {device.serialNumber}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onExportResults} disabled={isRunning}>
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
          <Button onClick={handleRunDiagnostic} disabled={isRunning}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRunning ? "animate-spin" : ""}`} />
            Run Diagnostic
          </Button>
        </div>
      </div>

      {isRunning && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Running diagnostics...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DeviceMetricCard
          title="Signal Strength"
          value={`${device.signalStrength}%`}
          icon={<Signal className="h-4 w-4" />}
          status={getMetricStatus(device.signalStrength)}
        />
        <DeviceMetricCard
          title="Battery Level"
          value={`${device.batteryLevel}%`}
          icon={<Battery className="h-4 w-4" />}
          status={getMetricStatus(device.batteryLevel)}
        />
        <DeviceMetricCard
          title="Connection"
          value={device.status === "Online" ? "Connected" : "Disconnected"}
          icon={<Wifi className="h-4 w-4" />}
          status={device.status === "Online" ? "normal" : "critical"}
        />
        <DeviceMetricCard
          title="Activity"
          value={device.lastPing}
          icon={<Activity className="h-4 w-4" />}
          status="normal"
        />
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Status</TabsTrigger>
          <TabsTrigger value="history">Diagnostic History</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current device health and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemMetrics.map((metric) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <Badge
                        variant={
                          metric.status === "Pass" ? "default" : metric.status === "Warning" ? "warning" : "destructive"
                        }
                      >
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={metric.value} className="h-2" />
                      <span className="min-w-[3rem] text-sm">{metric.value}%</span>
                    </div>
                    {metric.message && <p className="text-sm text-muted-foreground">{metric.message}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic History</CardTitle>
              <CardDescription>Previous diagnostic results and findings</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {diagnosticHistory.map((result) => (
                    <div key={result.id} className="flex items-start gap-4 rounded-lg border p-4">
                      <div
                        className={`rounded-full p-2 ${
                          result.status === "Pass"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                            : result.status === "Warning"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30"
                        }`}
                      >
                        {result.status === "Pass" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : result.status === "Warning" ? (
                          <AlertTriangle className="h-4 w-4" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{result.type}</p>
                          <span className="text-sm text-muted-foreground">{result.timestamp}</span>
                        </div>
                        <div className="mt-2 space-y-1">
                          {Object.entries(result.metrics).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{key}:</span>
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                        {result.notes && <p className="mt-2 text-sm text-muted-foreground">{result.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface DeviceMetricCardProps {
  title: string
  value: string
  icon: React.ReactNode
  status: "normal" | "warning" | "critical"
}

function DeviceMetricCard({ title, value, icon, status }: DeviceMetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <CardDescription>Current status</CardDescription>
        </div>
        <div
          className={`ml-auto ${
            status === "normal" ? "text-green-500" : status === "warning" ? "text-yellow-500" : "text-red-500"
          }`}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

function getMetricStatus(value: number): "normal" | "warning" | "critical" {
  if (value >= 75) return "normal"
  if (value >= 50) return "warning"
  return "critical"
}

const systemMetrics = [
  {
    name: "CPU Usage",
    value: 45,
    status: "Pass" as const,
    message: "Operating within normal parameters",
  },
  {
    name: "Memory Usage",
    value: 68,
    status: "Warning" as const,
    message: "Approaching high memory usage",
  },
  {
    name: "Storage",
    value: 32,
    status: "Pass" as const,
    message: null,
  },
  {
    name: "Network Latency",
    value: 85,
    status: "Warning" as const,
    message: "Higher than normal latency detected",
  },
]

