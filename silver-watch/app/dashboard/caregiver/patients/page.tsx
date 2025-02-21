import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus, Heart, Thermometer, Activity } from "lucide-react"

export default function PatientsPage() {
  return (
    <DashboardLayout userRole="caregiver">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Patients</h2>
            <p className="text-muted-foreground">Manage and monitor your assigned patients</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search patients..." className="pl-8" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Patient
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Active Alerts */}
          <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Active Alerts</CardTitle>
              <CardDescription>Patients requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Alert Type</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.patientName}</TableCell>
                      <TableCell>{alert.type}</TableCell>
                      <TableCell>{alert.time}</TableCell>
                      <TableCell>
                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-900/30">
                          {alert.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="destructive" size="sm">
                          Respond
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Patient List */}
          <Card>
            <CardHeader>
              <CardTitle>All Patients</CardTitle>
              <CardDescription>A list of all patients under your care</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Vital Signs</TableHead>
                    <TableHead>Last Check</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell>{patient.room}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.heartRate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Thermometer className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.temperature}°C</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.bloodPressure}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{patient.lastCheck}</TableCell>
                      <TableCell>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            patient.status === "Stable"
                              ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                              : patient.status === "Warning"
                                ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
                                : "bg-red-100 text-red-600 dark:bg-red-900/30"
                          }`}
                        >
                          {patient.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

const activeAlerts = [
  {
    id: 1,
    patientName: "John Doe",
    type: "High Heart Rate",
    time: "5 mins ago",
    status: "Urgent",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    type: "Fall Detected",
    time: "10 mins ago",
    status: "Urgent",
  },
]

const patients = [
  {
    id: 1,
    name: "John Doe",
    room: "101",
    heartRate: "85 bpm",
    temperature: "37.2",
    bloodPressure: "120/80",
    lastCheck: "5 mins ago",
    status: "Warning",
  },
  {
    id: 2,
    name: "Jane Smith",
    room: "102",
    heartRate: "72 bpm",
    temperature: "36.8",
    bloodPressure: "118/75",
    lastCheck: "10 mins ago",
    status: "Stable",
  },
  {
    id: 3,
    name: "Robert Johnson",
    room: "103",
    heartRate: "95 bpm",
    temperature: "38.5",
    bloodPressure: "135/88",
    lastCheck: "15 mins ago",
    status: "Critical",
  },
]

