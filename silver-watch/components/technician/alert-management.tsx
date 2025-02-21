"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Bell, CheckCircle2, Clock, Filter, Search, XCircle } from "lucide-react"
import type { Alert } from "@/types/technician"

interface AlertManagementProps {
  alerts: Alert[]
  onAcknowledgeAlert: (alertId: string) => Promise<void>
  onResolveAlert: (alertId: string, resolution: string) => Promise<void>
}

export function AlertManagement({ alerts, onAcknowledgeAlert, onResolveAlert }: AlertManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [resolution, setResolution] = useState("")
  const [isResolving, setIsResolving] = useState(false)

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.deviceId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAcknowledge = async (alert: Alert) => {
    try {
      await onAcknowledgeAlert(alert.id)
    } catch (error) {
      console.error("Failed to acknowledge alert:", error)
    }
  }

  const handleResolve = async (alert: Alert) => {
    setSelectedAlert(alert)
    setResolution("")
  }

  const handleSubmitResolution = async () => {
    if (!selectedAlert) return

    setIsResolving(true)
    try {
      await onResolveAlert(selectedAlert.id, resolution)
      setSelectedAlert(null)
      setResolution("")
    } catch (error) {
      console.error("Failed to resolve alert:", error)
    } finally {
      setIsResolving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Alert Management</h2>
          <p className="text-muted-foreground">Monitor and respond to system alerts</p>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Alerts</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Acknowledged">Acknowledged</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
            <CardDescription>Current system alerts requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 rounded-lg border p-4">
                    <div
                      className={`rounded-full p-2 ${
                        alert.severity === "Critical"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30"
                          : alert.severity === "High"
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30"
                            : alert.severity === "Medium"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/30"
                      }`}
                    >
                      {alert.type === "Error" ? (
                        <XCircle className="h-4 w-4" />
                      ) : alert.type === "Warning" ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <Bell className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Device ID: {alert.deviceId}</span>
                            <Badge
                              variant={
                                alert.severity === "Critical"
                                  ? "destructive"
                                  : alert.severity === "High"
                                    ? "warning"
                                    : "default"
                              }
                            >
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.message}</p>
                        </div>
                        <Badge variant="outline">{alert.status}</Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-4">
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {new Date(alert.timestamp).toLocaleString()}
                        </span>
                        {alert.status === "Active" && (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleAcknowledge(alert)}>
                              Acknowledge
                            </Button>
                            <Button size="sm" onClick={() => handleResolve(alert)}>
                              Resolve
                            </Button>
                          </div>
                        )}
                        {alert.status === "Acknowledged" && (
                          <Button size="sm" onClick={() => handleResolve(alert)}>
                            Resolve
                          </Button>
                        )}
                        {alert.status === "Resolved" && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Resolved by: {alert.resolvedBy}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Dialog open={selectedAlert !== null} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resolve Alert</DialogTitle>
            <DialogDescription>Provide resolution details for the alert</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Alert Details</Label>
              <p className="text-sm">{selectedAlert?.message}</p>
            </div>
            <div className="space-y-2">
              <Label>Resolution Notes</Label>
              <Textarea
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
                placeholder="Describe how the alert was resolved..."
                className="h-32"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAlert(null)} disabled={isResolving}>
              Cancel
            </Button>
            <Button onClick={handleSubmitResolution} disabled={isResolving || !resolution.trim()}>
              {isResolving ? "Resolving..." : "Submit Resolution"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface LabelProps {
  children: React.ReactNode
}

function Label({ children }: LabelProps) {
  return (
    <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </span>
  )
}

