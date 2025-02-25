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
import { formatDateTime } from "@/utils/date";
export default function UsersPage() {
  const { useFetchData } = useApi<User>(`${USERS_URL}`, 100);
  const { data: users, isLoading, isFetched } = useFetchData(1, { all: true });

  if (isLoading || !isFetched) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">User Management</h2>
            <p className="text-muted-foreground">Manage system users and permissions</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search users..." className="pl-8 w-full sm:w-[300px]" />
            </div>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Role Overview */}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
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
              <div className="overflow-x-auto">
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
                    {users && users?.results?.length > 0 ? (
                      users.results.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.first_name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={getBadgeVariant(user?.role || "admin")}>{user?.role || "admin"}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === "Active" ? "secondary" : "destructive"}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDateTime(user.last_login || user.date_joined, "medium")}</TableCell>
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500">
                          There was an issue fetching users.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
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

