import { Suspense } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { HealthDashboard } from "@/components/health-dashboard"
import { LoadingDashboard } from "@/components/loading-dashboard"

export default function CaregiverDashboardPage() {
  return (
    <DashboardLayout userRole="caregiver">
      <Suspense fallback={<LoadingDashboard />}>
        <HealthDashboard />
      </Suspense>
    </DashboardLayout>
  )
}

