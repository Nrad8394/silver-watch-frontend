"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Heart,
  Activity,
  Thermometer,
  Droplets,
  Clock,
  Calendar,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  FileText,
  User,
  PillIcon as Pills,
  Bell,
} from "lucide-react"

interface PatientProfileProps {
  patient: {
    id: string
    name: string
    age: number
    gender: string
    status: "Stable" | "Warning" | "Critical"
    room: string
    primaryCaregiver: string
    contactInfo: {
      phone: string
      email: string
      address: string
      emergencyContact: {
        name: string
        relation: string
        phone: string
      }
    }
    vitalSigns: {
      heartRate: number
      bloodPressure: string
      temperature: number
      oxygenLevel: number
    }
    medications: Array<{
      name: string
      dosage: string
      frequency: string
      nextDose: string
    }>
    allergies: string[]
    diagnoses: string[]
    notes: Array<{
      date: string
      author: string
      content: string
      type: "Regular" | "Alert" | "Critical"
    }>
  }
}

export function PatientProfile({ patient }: PatientProfileProps) {
  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{patient.name}</h2>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  patient.status === "Stable" ? "default" : patient.status === "Warning" ? "warning" : "destructive"
                }
              >
                {patient.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Room {patient.room} • Age {patient.age} • {patient.gender}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Set Alert
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="notes">Care Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.contactInfo.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{patient.contactInfo.address}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Emergency Contact</div>
                  <div className="text-sm">
                    {patient.contactInfo.emergencyContact.name} ({patient.contactInfo.emergencyContact.relation})
                    <br />
                    {patient.contactInfo.emergencyContact.phone}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Information */}
            <Card>
              <CardHeader>
                <CardTitle>Medical Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Diagnoses</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.diagnoses.map((diagnosis, index) => (
                      <Badge key={index} variant="secondary">
                        {diagnosis}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Allergies</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {patient.allergies.map((allergy, index) => (
                      <Badge key={index} variant="outline">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Care Team */}
            <Card>
              <CardHeader>
                <CardTitle>Care Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>PC</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{patient.primaryCaregiver}</div>
                      <div className="text-sm text-muted-foreground">Primary Caregiver</div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    View Full Care Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <VitalSignCard
              title="Heart Rate"
              value={`${patient.vitalSigns.heartRate} BPM`}
              icon={<Heart className="h-4 w-4" />}
              status={getVitalStatus(patient.vitalSigns.heartRate, 60, 100)}
            />
            <VitalSignCard
              title="Blood Pressure"
              value={patient.vitalSigns.bloodPressure}
              icon={<Activity className="h-4 w-4" />}
              status={getVitalStatus(Number.parseInt(patient.vitalSigns.bloodPressure.split("/")[0]), 90, 140)}
            />
            <VitalSignCard
              title="Temperature"
              value={`${patient.vitalSigns.temperature}°C`}
              icon={<Thermometer className="h-4 w-4" />}
              status={getVitalStatus(patient.vitalSigns.temperature, 36.1, 37.2)}
            />
            <VitalSignCard
              title="Oxygen Level"
              value={`${patient.vitalSigns.oxygenLevel}%`}
              icon={<Droplets className="h-4 w-4" />}
              status={getVitalStatus(patient.vitalSigns.oxygenLevel, 95, 100)}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Vital Signs History</CardTitle>
              <CardDescription>24-hour trend</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-lg">
                <p className="text-sm text-muted-foreground">Vital signs chart placeholder</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>Active prescriptions and schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.medications.map((medication, index) => (
                  <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                    <Pills className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{medication.name}</p>
                          <p className="text-sm text-muted-foreground">{medication.dosage}</p>
                        </div>
                        <Badge variant="outline">{medication.frequency}</Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Next dose: {medication.nextDose}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Mark as Given
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Care Notes</CardTitle>
              <CardDescription>Recent observations and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {patient.notes.map((note, index) => (
                    <div key={index} className="flex gap-4 rounded-lg border p-4">
                      <div
                        className={`rounded-full p-2 ${
                          note.type === "Critical"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30"
                            : note.type === "Alert"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                              : "bg-green-100 text-green-700 dark:bg-green-900/30"
                        }`}
                      >
                        {note.type === "Critical" ? (
                          <AlertTriangle className="h-4 w-4" />
                        ) : note.type === "Alert" ? (
                          <Bell className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{note.author}</p>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{note.date}</span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{note.content}</p>
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

interface VitalSignCardProps {
  title: string
  value: string
  icon: React.ReactNode
  status: "normal" | "warning" | "critical"
}

function VitalSignCard({ title, value, icon, status }: VitalSignCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <CardDescription>Current reading</CardDescription>
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
        <Badge variant={status === "normal" ? "default" : status === "warning" ? "warning" : "destructive"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardContent>
    </Card>
  )
}

function getVitalStatus(value: number, min: number, max: number): "normal" | "warning" | "critical" {
  if (value >= min && value <= max) return "normal"
  if (value < min - 10 || value > max + 10) return "critical"
  return "warning"
}

