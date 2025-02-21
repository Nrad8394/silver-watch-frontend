import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PillIcon as Pills, Clock, AlertTriangle, CalendarDays, Plus } from "lucide-react"

export default function MedicationsPage() {
  return (
    <DashboardLayout userRole="patient">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Medications</h2>
            <p className="text-muted-foreground">Track and manage your medications</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Medication
          </Button>
        </div>

        {/* Active Reminders */}
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Upcoming Medication</AlertTitle>
          <AlertDescription>
            Blood pressure medication due in 15 minutes
            <div className="mt-2">
              <Button size="sm" variant="outline">
                Mark as Taken
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="current" className="space-y-4">
          <TabsList>
            <TabsTrigger value="current">Current Medications</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentMedications.map((medication, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center space-y-0">
                    <div className="flex-1">
                      <CardTitle>{medication.name}</CardTitle>
                      <CardDescription>{medication.dosage}</CardDescription>
                    </div>
                    <Pills className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Frequency</span>
                        <span className="text-sm font-medium">{medication.frequency}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Next Dose</span>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{medication.nextDose}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Prescribed By</span>
                        <span className="text-sm font-medium">{medication.prescribedBy}</span>
                      </div>
                      <Badge variant={medication.status === "Active" ? "default" : "secondary"}>
                        {medication.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Schedule</CardTitle>
                <CardDescription>Your medication schedule for today</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {medicationSchedule.map((schedule, index) => (
                      <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{schedule.time}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{schedule.medication}</p>
                          <p className="text-sm text-muted-foreground">{schedule.dosage}</p>
                        </div>
                        <Badge variant={schedule.taken ? "default" : "outline"}>
                          {schedule.taken ? "Taken" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medication History</CardTitle>
                <CardDescription>Past medications and adherence</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {medicationHistory.map((entry, index) => (
                      <div key={index} className="space-y-2 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{entry.medication}</p>
                            <p className="text-sm text-muted-foreground">{entry.period}</p>
                          </div>
                          <Badge variant="outline">{entry.status}</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarDays className="h-4 w-4" />
                          <span>Adherence Rate: {entry.adherenceRate}</span>
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
    </DashboardLayout>
  )
}

const currentMedications = [
  {
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    nextDose: "Today, 9:00 PM",
    prescribedBy: "Dr. Sarah Smith",
    status: "Active",
  },
  {
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    nextDose: "Today, 2:00 PM",
    prescribedBy: "Dr. Michael Lee",
    status: "Active",
  },
  {
    name: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    nextDose: "Tomorrow, 8:00 AM",
    prescribedBy: "Dr. Sarah Smith",
    status: "Active",
  },
]

const medicationSchedule = [
  {
    time: "8:00 AM",
    medication: "Metformin",
    dosage: "500mg",
    taken: true,
  },
  {
    time: "9:00 AM",
    medication: "Lisinopril",
    dosage: "10mg",
    taken: true,
  },
  {
    time: "2:00 PM",
    medication: "Metformin",
    dosage: "500mg",
    taken: false,
  },
  {
    time: "9:00 PM",
    medication: "Aspirin",
    dosage: "81mg",
    taken: false,
  },
]

const medicationHistory = [
  {
    medication: "Amoxicillin",
    period: "Jan 1 - Jan 10, 2024",
    status: "Completed",
    adherenceRate: "100%",
  },
  {
    medication: "Prednisone",
    period: "Dec 15 - Dec 30, 2023",
    status: "Completed",
    adherenceRate: "95%",
  },
  {
    medication: "Ibuprofen",
    period: "Dec 1 - Dec 7, 2023",
    status: "Completed",
    adherenceRate: "90%",
  },
]

