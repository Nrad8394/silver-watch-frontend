import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Plus, Clock } from "lucide-react"

export default function CalendarPage() {
  return (
    <DashboardLayout userRole="caregiver">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Calendar</h2>
            <p className="text-muted-foreground">Manage appointments and schedules</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Event
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View and manage your schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={new Date()} className="rounded-md border" />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Next 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center gap-4 rounded-lg border p-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{event.title}</p>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reminders</CardTitle>
                <CardDescription>Important tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reminders.map((reminder, index) => (
                    <div key={index} className="flex items-center gap-4 rounded-lg border p-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          reminder.priority === "high"
                            ? "bg-red-500"
                            : reminder.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{reminder.task}</p>
                        <p className="text-sm text-muted-foreground">{reminder.due}</p>
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

const upcomingEvents = [
  {
    title: "Check vitals - Room 101",
    time: "In 30 minutes",
  },
  {
    title: "Medication round",
    time: "In 1 hour",
  },
  {
    title: "Team meeting",
    time: "2:00 PM",
  },
  {
    title: "End of shift report",
    time: "5:00 PM",
  },
]

const reminders = [
  {
    task: "Update patient charts",
    due: "Today",
    priority: "high",
  },
  {
    task: "Review medication changes",
    due: "Today",
    priority: "medium",
  },
  {
    task: "Schedule weekly checkups",
    due: "Tomorrow",
    priority: "low",
  },
]

