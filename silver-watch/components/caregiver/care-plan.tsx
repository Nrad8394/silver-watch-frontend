"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, Clock, Calendar, AlertTriangle, FileText, Plus, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CarePlanProps {
  patient: {
    id: string
    name: string
    carePlan: {
      goals: Array<{
        id: string
        title: string
        description: string
        progress: number
        status: "In Progress" | "Completed" | "At Risk"
        dueDate: string
      }>
      tasks: Array<{
        id: string
        title: string
        description: string
        category: string
        priority: "High" | "Medium" | "Low"
        status: "Pending" | "In Progress" | "Completed"
        dueDate: string
      }>
      assessments: Array<{
        id: string
        type: string
        frequency: string
        lastCompleted: string
        nextDue: string
        status: "Up to Date" | "Due Soon" | "Overdue"
      }>
    }
  }
}

export function CarePlan({ patient }: CarePlanProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Care Plan</h2>
          <p className="text-muted-foreground">{patient.name}&apos;s treatment and care objectives</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export Plan
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Care Goals */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Care Goals</CardTitle>
            <CardDescription>Treatment objectives and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patient.carePlan.goals.map((goal) => (
                <div key={goal.id} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{goal.title}</h4>
                        <Badge
                          variant={
                            goal.status === "Completed"
                              ? "default"
                              : goal.status === "At Risk"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {goal.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Goal</DropdownMenuItem>
                        <DropdownMenuItem>Update Progress</DropdownMenuItem>
                        <DropdownMenuItem>Mark Complete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {goal.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Care Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Care Tasks</CardTitle>
            <CardDescription>Daily care activities and treatments</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {patient.carePlan.tasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-4 rounded-lg border p-4">
                    <Checkbox id={task.id} checked={task.status === "Completed"} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor={task.id}
                          className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {task.title}
                        </label>
                        <Badge
                          variant={
                            task.priority === "High"
                              ? "destructive"
                              : task.priority === "Medium"
                                ? "warning"
                                : "secondary"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Due: {task.dueDate}
                        </span>
                        <Badge variant="outline">{task.category}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Assessments */}
        <Card>
          <CardHeader>
            <CardTitle>Assessments</CardTitle>
            <CardDescription>Regular health evaluations</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {patient.carePlan.assessments.map((assessment) => (
                  <div key={assessment.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{assessment.type}</h4>
                      <Badge
                        variant={
                          assessment.status === "Up to Date"
                            ? "default"
                            : assessment.status === "Due Soon"
                              ? "warning"
                              : "destructive"
                        }
                      >
                        {assessment.status}
                      </Badge>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-muted-foreground">Frequency: {assessment.frequency}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Last completed: {assessment.lastCompleted}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Next due: {assessment.nextDue}</span>
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
  )
}

