import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, TrendingUp, AlertTriangle } from "lucide-react"

export default function ReportsPage() {
  return (
    <DashboardLayout userRole="caregiver">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Reports</h2>
            <p className="text-muted-foreground">View and generate patient reports</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="week">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Last 24 Hours</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <div>
                <CardTitle>Total Reports</CardTitle>
                <CardDescription>Generated reports</CardDescription>
              </div>
              <FileText className="ml-auto h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <div>
                <CardTitle>Health Trends</CardTitle>
                <CardDescription>Patient improvements</CardDescription>
              </div>
              <TrendingUp className="ml-auto h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">67%</div>
              <p className="text-xs text-muted-foreground">Positive trends</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0">
              <div>
                <CardTitle>Critical Events</CardTitle>
                <CardDescription>Reported incidents</CardDescription>
              </div>
              <AlertTriangle className="ml-auto h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Latest generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{report.title}</p>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Categories</CardTitle>
              <CardDescription>Types of reports generated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportCategories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{category.name}</p>
                      <p className="text-sm text-muted-foreground">{category.count} reports</p>
                    </div>
                    <div
                      className="h-2 w-24 rounded-full bg-secondary"
                      style={{
                        backgroundImage: `linear-gradient(90deg, var(--primary) ${category.percentage}%, transparent ${category.percentage}%)`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

const recentReports = [
  {
    title: "Weekly Health Summary - John Doe",
    date: "Generated 2 hours ago",
  },
  {
    title: "Monthly Progress Report - Jane Smith",
    date: "Generated 1 day ago",
  },
  {
    title: "Incident Report - Room 103",
    date: "Generated 2 days ago",
  },
  {
    title: "Vital Signs Analysis - Robert Johnson",
    date: "Generated 3 days ago",
  },
]

const reportCategories = [
  {
    name: "Health Summaries",
    count: 125,
    percentage: 80,
  },
  {
    name: "Incident Reports",
    count: 45,
    percentage: 60,
  },
  {
    name: "Progress Reports",
    count: 38,
    percentage: 40,
  },
  {
    name: "Medication Reports",
    count: 27,
    percentage: 30,
  },
]

