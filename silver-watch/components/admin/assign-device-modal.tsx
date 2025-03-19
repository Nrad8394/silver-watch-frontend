"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface AssignDeviceModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: unknown) => void
}

export function AssignDeviceModal({ isOpen, onClose, onSubmit }: AssignDeviceModalProps) {
  const [formData, setFormData] = useState({
    deviceId: "",
    patientId: "",
    location: "",
    updateInterval: "realtime",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Device</DialogTitle>
          <DialogDescription>Link a device to a patient and configure its settings.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="deviceId">Device</Label>
              <Select
                value={formData.deviceId}
                onValueChange={(value) => setFormData({ ...formData, deviceId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hrm-001">Heart Rate Monitor (HRM-001)</SelectItem>
                  <SelectItem value="bp-002">Blood Pressure Monitor (BP-002)</SelectItem>
                  <SelectItem value="temp-003">Temperature Sensor (TEMP-003)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient</Label>
              <Select
                value={formData.patientId}
                onValueChange={(value) => setFormData({ ...formData, patientId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="p-001">John Doe (P-001)</SelectItem>
                  <SelectItem value="p-002">Jane Smith (P-002)</SelectItem>
                  <SelectItem value="p-003">Robert Johnson (P-003)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Bedroom, Living Room"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="updateInterval">Update Interval</Label>
              <Select
                value={formData.updateInterval}
                onValueChange={(value) => setFormData({ ...formData, updateInterval: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select update interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="1min">Every minute</SelectItem>
                  <SelectItem value="5min">Every 5 minutes</SelectItem>
                  <SelectItem value="15min">Every 15 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Assign Device</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

