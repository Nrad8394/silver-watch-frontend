"use client"

// import { useUser } from "@/contexts/user-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Bell, Mail, MessageSquare, Loader2 } from "lucide-react"

export function NotificationSettings() {
  const { user, updateNotificationSettings, isLoading } = useUser()
  const { toast } = useToast()

  const handleSettingChange = async (type: "email" | "push" | "sms", setting: string, value: boolean) => {
    try {
      await updateNotificationSettings({
        [type]: {
          ...user?.notifications[type],
          [setting]: value,
        },
      })
      toast({
        title: "Settings updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings.",
        variant: "destructive",
      })
    }
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Manage your email notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(user.notifications.email).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between space-x-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor={`email-${key}`} className="font-medium">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Label>
              </div>
              <Switch
                id={`email-${key}`}
                checked={value}
                onCheckedChange={(checked) => handleSettingChange("email", key, checked)}
                disabled={isLoading}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>Control push notifications on your devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(user.notifications.push).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between space-x-2">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor={`push-${key}`} className="font-medium">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Label>
              </div>
              <Switch
                id={`push-${key}`}
                checked={value}
                onCheckedChange={(checked) => handleSettingChange("push", key, checked)}
                disabled={isLoading}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SMS Notifications</CardTitle>
          <CardDescription>Manage text message notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(user.notifications.sms).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between space-x-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor={`sms-${key}`} className="font-medium">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Label>
              </div>
              <Switch
                id={`sms-${key}`}
                checked={value}
                onCheckedChange={(checked) => handleSettingChange("sms", key, checked)}
                disabled={isLoading}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
    </div>
  )
}

