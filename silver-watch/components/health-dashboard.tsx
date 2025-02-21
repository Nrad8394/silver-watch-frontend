"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, History, Timer, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PatientCard } from "@/components/patient-card"
import { HealthChart } from "@/components/health-chart"

export function HealthDashboard() {
  return (
    <div className="grid gap-6">
      {/* Emergency Alerts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Emergency Alerts</h2>
        <Alert variant="destructive">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Fall Detected</AlertTitle>
          <AlertDescription>
            Fall detected for Patient #123 - John Doe at 2:45 PM
            <div className="mt-2">
              <Button size="sm" variant="destructive">
                Respond Now
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </section>

      {/* Quick Stats */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <User className="ml-auto h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="ml-auto h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 high priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0">
            <CardTitle className="text-sm font-medium">Connected Devices</CardTitle>
            <Timer className="ml-auto h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">98% online</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <History className="ml-auto h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2m</div>
            <p className="text-xs text-muted-foreground">Avg. response time</p>
          </CardContent>
        </Card>
      </section>

      {/* Patient Overview */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle>Health Trends</CardTitle>
            <CardDescription>Average vital signs over the past 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <HealthChart />
          </CardContent>
        </Card>
        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
            <CardDescription>Latest patient activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350px]">
              <div className="space-y-4">
                <PatientCard
                  name="John Doe"
                  status="Critical"
                  lastChecked="2 mins ago"
                  heartRate={95}
                  temperature={38.5}
                />
                <PatientCard
                  name="Jane Smith"
                  status="Stable"
                  lastChecked="5 mins ago"
                  heartRate={72}
                  temperature={36.8}
                />
                <PatientCard
                  name="Robert Johnson"
                  status="Stable"
                  lastChecked="10 mins ago"
                  heartRate={68}
                  temperature={36.6}
                />
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

