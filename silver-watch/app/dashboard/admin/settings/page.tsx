import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings2, Mail, Smartphone } from "lucide-react"

export default function SettingsPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">System Settings</h2>
          <p className="text-muted-foreground">Configure system-wide preferences and notifications</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure basic system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input id="siteName" placeholder="Enter site name" defaultValue="Silver Watch System" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
                <CardDescription>Configure system-wide preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {systemPreferences.map((preference) => (
                  <div key={preference.id} className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor={preference.id}>{preference.name}</Label>
                      <p className="text-sm text-muted-foreground">{preference.description}</p>
                    </div>
                    <Switch id={preference.id} checked={preference.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how and when notifications are sent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="space-y-4">
                    <div className="font-medium">{setting.category}</div>
                    <div className="space-y-4">
                      {setting.options.map((option) => (
                        <div key={option.id} className="flex items-center justify-between space-x-2">
                          <div className="space-y-0.5">
                            <Label htmlFor={option.id}>{option.name}</Label>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                          <Switch id={option.id} checked={option.enabled} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Integrations</CardTitle>
                <CardDescription>Manage external system integrations and APIs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="flex items-center justify-between space-x-4 rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">{integration.name}</h4>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                    <Button variant={integration.connected ? "outline" : "default"}>
                      {integration.connected ? "Configure" : "Connect"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize the look and feel of the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {appearanceSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor={setting.id}>{setting.name}</Label>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <Switch id={setting.id} checked={setting.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

const systemPreferences = [
  {
    id: "autoUpdate",
    name: "Automatic Updates",
    description: "Keep the system up to date automatically",
    enabled: true,
  },
  {
    id: "analytics",
    name: "Usage Analytics",
    description: "Collect anonymous usage data to improve the system",
    enabled: true,
  },
  {
    id: "backup",
    name: "Automated Backups",
    description: "Regular system data backups",
    enabled: true,
  },
]

const notificationSettings = [
  {
    id: "alerts",
    category: "Alert Notifications",
    options: [
      {
        id: "emergency",
        name: "Emergency Alerts",
        description: "High-priority emergency notifications",
        enabled: true,
      },
      {
        id: "system",
        name: "System Notifications",
        description: "Important system updates and changes",
        enabled: true,
      },
    ],
  },
  {
    id: "updates",
    category: "System Updates",
    options: [
      {
        id: "maintenance",
        name: "Maintenance Updates",
        description: "Scheduled maintenance notifications",
        enabled: true,
      },
      {
        id: "features",
        name: "Feature Updates",
        description: "New feature announcements",
        enabled: false,
      },
    ],
  },
]

const integrations = [
  {
    id: "email",
    name: "Email Service",
    description: "Configure email notification service",
    connected: true,
    icon: Mail,
  },
  {
    id: "sms",
    name: "SMS Gateway",
    description: "Configure SMS notification service",
    connected: false,
    icon: Smartphone,
  },
  {
    id: "api",
    name: "External API",
    description: "Configure external API integration",
    connected: true,
    icon: Settings2,
  },
]

const appearanceSettings = [
  {
    id: "animations",
    name: "Interface Animations",
    description: "Enable interface animations",
    enabled: true,
  },
  {
    id: "compact",
    name: "Compact Mode",
    description: "Use compact display mode",
    enabled: false,
  },
  {
    id: "accessibility",
    name: "High Contrast",
    description: "Increase contrast for better visibility",
    enabled: false,
  },
]

