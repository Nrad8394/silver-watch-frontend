"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Bell, Mail, MessageSquare, Loader2 } from "lucide-react"

import { useApi } from "@/hooks/useApi"
import ApiService from "@/handler/ApiService"
import { User } from "@/types/users"
export function NotificationSettings() {
  const { useFetchData, useAddItem } = useApi<User,User>(ApiService.USER_URL)

  const { data:fetchedUser, isLoading } = useFetchData(1)

  const { mutate:updateNotificationSettings } = useAddItem
  const user = fetchedUser?.results[0] || null

  const handleSettingChange = async (type: "email" | "push" | "sms", setting: string, value: boolean) => {
    try {
      if (user) {
        const updatedUser = { 
          ...user,
          notifications: {
            ...user.notifications,
            [type]: {
              ...user.notifications[type],
              [setting]: value
            }
          }
        }
        await updateNotificationSettings(updatedUser)
      }
      toast.success("Notification settings updated successfully")
    } catch (error) {
      toast("An error occurred while updating notification settings")
      console.error(error)
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
                checked={Boolean(value)}
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
                checked={Boolean(value)}
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
                checked={Boolean(value)}
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
