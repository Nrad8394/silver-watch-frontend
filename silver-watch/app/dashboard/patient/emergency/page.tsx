import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Phone, MapPin, AlertTriangle, PhoneCall, User, Clock } from "lucide-react"

export default function EmergencyPage() {
  return (
    <DashboardLayout userRole="patient">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Emergency Information</h2>
          <p className="text-muted-foreground">Manage emergency contacts and view alert history</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Emergency Contacts</CardTitle>
                  <CardDescription>People to contact in case of emergency</CardDescription>
                </div>
                <Button>Add Contact</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Badge variant="outline">{contact.priority}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle>Current Location</CardTitle>
              <CardDescription>Your registered address and GPS location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Home Address</Label>
                <div className="flex items-start gap-2 rounded-lg border p-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="font-medium">123 Healthcare Avenue</p>
                    <p className="text-sm text-muted-foreground">Apt 4B, Medical District</p>
                    <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>GPS Tracking Status</Label>
                <div className="flex items-center gap-2 rounded-lg border p-3">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">Active and Tracking</span>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Map View</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Emergency Alerts</CardTitle>
              <CardDescription>History of recent emergency situations</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {recentAlerts.map((alert, index) => (
                    <div key={index} className="flex items-center gap-4 rounded-lg border p-4">
                      <div
                        className={`rounded-full p-2 ${
                          alert.type === "Fall Detected"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                        }`}
                      >
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{alert.type}</p>
                          <Badge variant="outline">{alert.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {alert.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {alert.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <PhoneCall className="h-4 w-4" />
                            {alert.respondedBy}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

const emergencyContacts = [
  {
    name: "John Smith",
    relationship: "Son",
    phone: "+1 234 567 890",
    priority: "Primary",
  },
  {
    name: "Mary Johnson",
    relationship: "Daughter",
    phone: "+1 234 567 891",
    priority: "Secondary",
  },
  {
    name: "Dr. Sarah Wilson",
    relationship: "Primary Care Physician",
    phone: "+1 234 567 892",
    priority: "Medical",
  },
]

const recentAlerts = [
  {
    type: "Fall Detected",
    time: "Today, 2:30 PM",
    location: "Bedroom",
    status: "Resolved",
    respondedBy: "John Smith",
  },
  {
    type: "Abnormal Heart Rate",
    time: "Yesterday, 10:15 AM",
    location: "Living Room",
    status: "Resolved",
    respondedBy: "Dr. Sarah Wilson",
  },
  {
    type: "Fall Detected",
    time: "Mar 15, 3:45 PM",
    location: "Bathroom",
    status: "Resolved",
    respondedBy: "Mary Johnson",
  },
]

