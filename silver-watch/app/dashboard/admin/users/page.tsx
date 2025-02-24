"use client";
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MoreHorizontal, Shield } from "lucide-react"
import { useApi } from "@/hooks/useApi"
import { USERS_URL } from "@/handler/apiConfig";
import { User } from "@/types/users";
import { useState } from "react";
export default function UsersPage() {
  const { useFetchData } = useApi<User>(`${USERS_URL}`,100)
  const { data: usersResponse, isLoading } = useFetchData(1,{all:true})
  const [users] = useState(usersResponse?.results || []);

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">User Management</h2>
            <p className="text-muted-foreground">Manage system users and permissions</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search users..." className="pl-8 md:w-[300px]" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Role Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {roleStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center space-y-0">
                  <div>
                    <CardTitle>{stat.role}</CardTitle>
                    <CardDescription>Active users</CardDescription>
                  </div>
                  <Shield className="ml-auto h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.count}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* User List */}
          <Card>
            <CardHeader>
              <CardTitle>System Users</CardTitle>
              <CardDescription>A list of all users in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.first_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(user.role)}>{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "secondary" : "destructive"}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>{user.last_active}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Deactivate User</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

const roleStats = [
  {
    role: "Administrators",
    count: 5,
    change: "No change",
  },
  {
    role: "Caregivers",
    count: 24,
    change: "+2 this month",
  },
  {
    role: "Technicians",
    count: 8,
    change: "+1 this month",
  },
  {
    role: "Total Users",
    count: 37,
    change: "+3 this month",
  },
]

const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "Now",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@example.com",
    role: "Caregiver",
    status: "Active",
    lastActive: "5 mins ago",
  },
  {
    id: 3,
    name: "Alex Thompson",
    email: "a.thompson@example.com",
    role: "Technician",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "e.brown@example.com",
    role: "Caregiver",
    status: "Inactive",
    lastActive: "2 days ago",
  },
]

function getBadgeVariant(role: string) {
  switch (role) {
    case "Admin":
      return "destructive"
    case "Caregiver":
      return "default"
    case "Technician":
      return "secondary"
    default:
      return "outline"
  }
}

