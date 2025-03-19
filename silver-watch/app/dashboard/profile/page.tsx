"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ProfileSettings } from "@/components/settings/profile-settings"
// import { SecuritySettings } from "@/components/settings/security-settings"
// import { NotificationSettings } from "@/components/settings/notification-settings"

export default function SettingsPage() {
  return (
      <div className="space-y-6 p-6">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent> */}

          {/* <TabsContent value="security">
            <SecuritySettings />
          </TabsContent> */}

          {/* <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent> */}
        </Tabs>
      </div>
  )
}

