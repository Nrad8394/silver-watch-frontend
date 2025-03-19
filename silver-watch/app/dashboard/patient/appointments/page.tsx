import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Video, User, Clock } from "lucide-react"

export default function AppointmentsPage() {
  return (
    <DashboardLayout userRole="patient">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Appointments</h2>
            <p className="text-muted-foreground">Schedule and manage your appointments</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Schedule Appointment
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          {/* Upcoming Appointments */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled visits</CardDescription>
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Appointments</SelectItem>
                      <SelectItem value="virtual">Virtual Visits</SelectItem>
                      <SelectItem value="inPerson">In-Person Visits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={`rounded-lg p-2 ${
                                appointment.type === "Virtual"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              }`}
                            >
                              {appointment.type === "Virtual" ? (
                                <Video className="h-4 w-4" />
                              ) : (
                                <User className="h-4 w-4" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{appointment.doctor}</h4>
                              <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{appointment.date}</p>
                              <p className="text-sm text-muted-foreground">{appointment.time}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <Badge variant="outline">{appointment.type}</Badge>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                              {appointment.type === "Virtual" && <Button size="sm">Join Call</Button>}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Past Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Past Appointments</CardTitle>
                <CardDescription>Previous visits and consultations</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {pastAppointments.map((appointment, index) => (
                      <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                        <div
                          className={`rounded-lg p-2 ${
                            appointment.type === "Virtual"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          }`}
                        >
                          {appointment.type === "Virtual" ? (
                            <Video className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{appointment.doctor}</h4>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{appointment.date}</p>
                          <p className="text-sm text-muted-foreground">{appointment.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Calendar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>View scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={new Date()} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Today&apos;s Schedule</CardTitle>
                <CardDescription>Upcoming appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

const upcomingAppointments = [
  {
    doctor: "Dr. Sarah Smith",
    specialty: "Primary Care Physician",
    date: "March 25, 2024",
    time: "10:00 AM",
    type: "Virtual",
  },
  {
    doctor: "Dr. Michael Lee",
    specialty: "Cardiologist",
    date: "March 28, 2024",
    time: "2:30 PM",
    type: "In-Person",
  },
  {
    doctor: "Dr. Emily Brown",
    specialty: "Physical Therapist",
    date: "April 1, 2024",
    time: "11:15 AM",
    type: "In-Person",
  },
]

const pastAppointments = [
  {
    doctor: "Dr. Sarah Smith",
    specialty: "Primary Care Physician",
    date: "March 10, 2024",
    time: "9:00 AM",
    type: "Virtual",
  },
  {
    doctor: "Dr. Michael Lee",
    specialty: "Cardiologist",
    date: "February 28, 2024",
    time: "3:30 PM",
    type: "In-Person",
  },
  {
    doctor: "Dr. Emily Brown",
    specialty: "Physical Therapist",
    date: "February 15, 2024",
    time: "10:15 AM",
    type: "In-Person",
  },
]

const todaySchedule = [
  {
    title: "Virtual Check-up with Dr. Smith",
    time: "10:00 AM",
  },
  {
    title: "Blood Test Results Review",
    time: "2:30 PM",
  },
]

