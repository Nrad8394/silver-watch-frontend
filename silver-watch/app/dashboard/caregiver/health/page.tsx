import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Thermometer, Activity, Droplets, Brain, TreesIcon as Lungs } from "lucide-react"

export default function HealthDataPage() {
  return (
    <DashboardLayout userRole="caregiver">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Health Data</h2>
            <p className="text-muted-foreground">Detailed health metrics and trends</p>
          </div>
          <Select defaultValue="john-doe">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select patient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john-doe">John Doe</SelectItem>
              <SelectItem value="jane-smith">Jane Smith</SelectItem>
              <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="vitals">
          <TabsList>
            <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="medication">Medication</TabsTrigger>
          </TabsList>
          <TabsContent value="vitals" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center space-y-0">
                  <div>
                    <CardTitle>Heart Rate</CardTitle>
                    <CardDescription>Beats per minute</CardDescription>
                  </div>
                  <Heart className="ml-auto h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">72 BPM</div>
                  <p className="text-xs text-muted-foreground">Normal range</p>
                  {/* Add a small chart here */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0">
                  <div>
                    <CardTitle>Blood Pressure</CardTitle>
                    <CardDescription>Systolic/Diastolic</CardDescription>
                  </div>
                  <Activity className="ml-auto h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">120/80</div>
                  <p className="text-xs text-muted-foreground">Normal range</p>
                  {/* Add a small chart here */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0">
                  <div>
                    <CardTitle>Temperature</CardTitle>
                    <CardDescription>Celsius</CardDescription>
                  </div>
                  <Thermometer className="ml-auto h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">37.2°C</div>
                  <p className="text-xs text-muted-foreground">Normal range</p>
                  {/* Add a small chart here */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0">
                  <div>
                    <CardTitle>Blood Oxygen</CardTitle>
                    <CardDescription>SpO2 Percentage</CardDescription>
                  </div>
                  <Droplets className="ml-auto h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">98%</div>
                  <p className="text-xs text-muted-foreground">Normal range</p>
                  {/* Add a small chart here */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0">
                  <div>
                    <CardTitle>Respiratory Rate</CardTitle>
                    <CardDescription>Breaths per minute</CardDescription>
                  </div>
                  <Lungs className="ml-auto h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">16</div>
                  <p className="text-xs text-muted-foreground">Normal range</p>
                  {/* Add a small chart here */}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center space-y-0">
                  <div>
                    <CardTitle>Consciousness</CardTitle>
                    <CardDescription>Glasgow Coma Scale</CardDescription>
                  </div>
                  <Brain className="ml-auto h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">15</div>
                  <p className="text-xs text-muted-foreground">Normal</p>
                  {/* Add a small chart here */}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Trends</CardTitle>
                <CardDescription>24-hour vital signs history</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add a larger chart here showing multiple vital signs over time */}
                <div className="h-[400px] flex items-center justify-center border rounded-lg">
                  <p className="text-muted-foreground">Chart placeholder</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            {/* Activity tracking content */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Activity</CardTitle>
                <CardDescription>Patient movement and activity levels</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add activity tracking visualization */}
                <div className="h-[400px] flex items-center justify-center border rounded-lg">
                  <p className="text-muted-foreground">Activity tracking placeholder</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medication">
            {/* Medication tracking content */}
            <Card>
              <CardHeader>
                <CardTitle>Medication Schedule</CardTitle>
                <CardDescription>Current medications and administration schedule</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add medication schedule */}
                <div className="h-[400px] flex items-center justify-center border rounded-lg">
                  <p className="text-muted-foreground">Medication schedule placeholder</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

