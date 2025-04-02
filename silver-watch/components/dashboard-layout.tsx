"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Bell,
  CalendarDays,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  Wrench,
  Shield,
  MessageSquare,
  Logs,
} from "lucide-react"

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: Record<string, NavItem[]> = {
  caregiver: [
    { name: "Dashboard", href: "/dashboard/caregiver", icon: LayoutDashboard },
    { name: "Patients", href: "/dashboard/caregiver/patients", icon: Users },
    { name: "Health Data", href: "/dashboard/caregiver/health", icon: Heart },
    { name: "Calendar", href: "/dashboard/caregiver/calendar", icon: CalendarDays },
    { name: "Reports", href: "/dashboard/caregiver/reports", icon: BarChart3 },
    // { name: "Profile", href: "/dashboard/profile", icon: UserCircle2 },
  ],
  admin: [
    { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", href: "/dashboard/admin/users", icon: Users },
    { name: "Devices", href: "/dashboard/admin/devices", icon: Wrench },
    { name: "Security", href: "/dashboard/admin/security", icon: Shield },
    { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    { name: "System Logs", href: "/dashboard/admin/system-logs", icon: Logs },
    // { name: "Profile", href: "/dashboard/profile", icon: UserCircle2 },

  ],
  technician: [
    { name: "Dashboard", href: "/dashboard/technician", icon: LayoutDashboard },
    { name: "Devices", href: "/dashboard/technician/devices", icon: Wrench },
    { name: "Maintenance", href: "/dashboard/technician/maintenance", icon: Settings },
    { name: "Calibration", href: "/dashboard/technician/calibration", icon: BarChart3 },
    // { name: "Profile", href: "/dashboard/profile", icon: UserCircle2 },
  ],
  patient: [
    { name: "Dashboard", href: "/dashboard/patient", icon: LayoutDashboard },
    { name: "Health Data", href: "/dashboard/patient/health", icon: Heart },
    { name: "Messages", href: "/dashboard/patient/messages", icon: MessageSquare },
    { name: "Emergency", href: "/dashboard/patient/emergency", icon: Bell },
    { name: "Devices", href: "/dashboard/patient/devices", icon: Wrench },
    { name: "Medications", href: "/dashboard/patient/medications", icon: Shield },
    { name: "Settings", href: "/dashboard/patient/settings", icon: Settings },
    // { name: "Profile", href: "/dashboard/profile", icon: UserCircle2 },
  ],
}

interface DashboardLayoutProps {
  children: ReactNode
  userRole: "caregiver" | "admin" | "technician" | "patient"
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = navItems[userRole]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 z-50 flex w-72 flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-1 flex-col border-r bg-card px-3 py-4">
          <div className="flex h-14 items-center border-b px-3">
            <span className="text-lg font-semibold">Silver Watch</span>
          </div>
          <nav className="flex-1 space-y-1 py-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium ${
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t pt-4">
            <Button variant="ghost" className="w-full justify-start" size="sm" asChild>
              <Link href="/login">
                <LogOut className="mr-3 h-5 w-5" />
                Log out
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center border-b px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="mr-4 lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="flex flex-1 items-center justify-end gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">View notifications</span>
            </Button>
          </div>
        </header>
        <main className="flex-1  px-4 py-6 lg:px-6">{children}</main>
      </div>
    </div>
  )
}

