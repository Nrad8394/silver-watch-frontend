"use client"

import {  useEffect } from "react"
import { useParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useApi } from "@/hooks/useApi"
import { USER_URL } from "@/handler/apiConfig"
import { User, UserRole } from "@/types/users"
import { formatDateTime } from "@/utils/date"
import { toast } from "sonner"
import {
  Shield,
  Clock,
  Settings,
  Users,
  Activity,
  Key,
  LogIn,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Loader2,
} from "lucide-react"

export default function UserProfilePage() {
  const { id } = useParams() as { id: string }
  const { useFetchById } = useApi<User, User>(USER_URL)
  const { data: userData, isLoading, error, isFetched } = useFetchById(id, { all: true })
  const user = userData as User 
  
  // Show error notification if API request fails
  useEffect(() => {
    if (error) {
      toast.error(`Error loading user data: ${error.message || 'Unknown error'}`)
    }
  }, [error])
  
  // Get initials for avatar fallback
  const getInitials = (name?: string): string => {
    if (!name) return "U"
    const parts = name.split(' ')
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  // Get role badge variant
  const getRoleBadgeVariant = (role?: UserRole) => {
    switch (role) {
      case "admin": return "destructive"
      case "caregiver": return "default"
      case "technician": return "secondary"
      case "patient": return "outline"
      default: return "outline"
    }
  }
  
  // Loading state
  if (isLoading || !isFetched) {
    return (
      <DashboardLayout userRole="admin">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading user profile...</p>
        </div>
      </DashboardLayout>
    )
  }
  
  // Error state
  if (error || !user) {
    console.error(user)
    return (
      <DashboardLayout userRole="admin">
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Failed to load user profile</h2>
            <p className="text-muted-foreground">{error?.message || "User not found"}</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* User Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage 
                  src={user?.profile_image || "/placeholder.svg?height=96&width=96"} 
                  alt={`${user?.first_name} ${user?.last_name}`.trim() || "User"} 
                />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{`${user.first_name} ${user.last_name}`}</h2>
              <div className="flex items-center gap-2">
                <Badge variant={getRoleBadgeVariant(user.role as UserRole)}>{user.role}</Badge>
                <Badge variant="outline">{user.is_active ? "Active" : "Inactive"}</Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">Reset Password</Button>
            <Button variant="outline">{user.is_active ? "Suspend Account" : "Activate Account"}</Button>
            <Button>Edit Profile</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="devices">Assigned Devices</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{user.phone_number || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{user.address || "Not specified"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Joined {formatDateTime(user.date_joined, "medium")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>{user.is_2fa_enabled ? "2FA Enabled" : "2FA Disabled"}</span>
                  </div>
                  {user.role === "caregiver" && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{user.assigned_patients_count || 0} Assigned Patients</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-muted-foreground" />
                        <div className="space-y-1">
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>User&apos;s recent system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {activityLog.map((log, index) => (
                      <div key={index} className="flex items-start gap-4 rounded-lg border p-4">
                        {log.icon}
                        <div className="flex-1">
                          <p className="font-medium">{log.action}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{log.timestamp}</span>
                            <MapPin className="h-4 w-4" />
                            <span>{log.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>User&apos;s access levels and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {permissions.map((permission, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Key className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{permission.name}</span>
                        </div>
                        <Badge variant={permission.granted ? "default" : "secondary"}>
                          {permission.granted ? "Granted" : "Denied"}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{permission.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Devices</CardTitle>
                <CardDescription>Devices under user&apos;s management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedDevices.map((device, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-1">
                        <p className="font-medium">{device.name}</p>
                        <p className="text-sm text-muted-foreground">{device.id}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{device.type}</Badge>
                        <Badge variant={device.status === "Active" ? "default" : "secondary"}>{device.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

// Keep the mock data for now, but this would typically come from API calls
const recentActivity = [
  { action: "Logged in to the system", time: "2 hours ago" },
  { action: "Updated patient records", time: "4 hours ago" },
  { action: "Generated health report", time: "Yesterday" },
]

const activityLog = [
  {
    action: "Generated monthly health report",
    timestamp: "2024-03-20 14:30:00",
    location: "Web Portal",
    icon: <FileText className="h-5 w-5 text-muted-foreground" />,
  },
  {
    action: "System login",
    timestamp: "2024-03-20 09:15:00",
    location: "Mobile App",
    icon: <LogIn className="h-5 w-5 text-muted-foreground" />,
  },
  {
    action: "Updated patient medication schedule",
    timestamp: "2024-03-19 16:45:00",
    location: "Web Portal",
    icon: <Settings className="h-5 w-5 text-muted-foreground" />,
  },
]

const permissions = [
  {
    name: "Patient Management",
    description: "View and manage assigned patient records",
    granted: true,
  },
  {
    name: "Report Generation",
    description: "Create and download patient health reports",
    granted: true,
  },
  {
    name: "Device Configuration",
    description: "Configure and manage monitoring devices",
    granted: false,
  },
  {
    name: "Emergency Response",
    description: "Respond to emergency alerts and notifications",
    granted: true,
  },
]

const assignedDevices = [
  {
    name: "Heart Rate Monitor",
    id: "HRM-2024-001",
    type: "Medical",
    status: "Active",
  },
  {
    name: "Fall Detection Sensor",
    id: "FDS-2024-002",
    type: "Safety",
    status: "Active",
  },
  {
    name: "Blood Pressure Monitor",
    id: "BPM-2024-003",
    type: "Medical",
    status: "Inactive",
  },
]

