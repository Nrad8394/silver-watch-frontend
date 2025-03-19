"use client"

import type React from "react"

import { useState } from "react"
// import { useUser } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2, Shield, Smartphone, Globe, XCircle } from "lucide-react"

export function SecuritySettings() {
  const { user, updatePassword, toggleTwoFactor, revokeSession, isLoading } = useUser()
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handlePasswordChange = async (event: React.FormEvent) => {
    event.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error(
        "Error",{
        description: "New password and confirm password do not match.",
        }
      )
      return
    }

    try {
      await updatePassword(currentPassword, newPassword)
      setShowPasswordDialog(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      toast.success("Password updated", {
        description: "Your password has been successfully changed.",
      });
    } catch (error) {
      console.error(error)
      toast.error(
        "Error",{
        description: "Failed to update password. Please try again.",
      })
    }
  }

  const handleTwoFactorToggle = async () => {
    try {
      await toggleTwoFactor()
      toast({
        title: user?.security.twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
        description: user?.security.twoFactorEnabled
          ? "Two-factor authentication has been disabled."
          : "Two-factor authentication has been enabled.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to toggle two-factor authentication.",
        variant: "destructive",
      })
    }
  }

  const handleSessionRevoke = async (sessionId: string) => {
    try {
      await revokeSession(sessionId)
      toast({
        title: "Session revoked",
        description: "The selected session has been terminated.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "Failed to revoke session. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your password and manage account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground">
                Last changed {new Date(user.security.lastPasswordChange).toLocaleDateString()}
              </p>
            </div>
            <Button onClick={() => setShowPasswordDialog(true)}>Change Password</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Two-Factor Authentication</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {user.security.twoFactorEnabled
                  ? "Two-factor authentication is enabled"
                  : "Two-factor authentication is disabled"}
              </p>
            </div>
            <Switch
              checked={user.security.twoFactorEnabled}
              onCheckedChange={handleTwoFactorToggle}
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage your active sessions across devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.security.activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  {session.device.toLowerCase().includes("mobile") ? (
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Globe className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div className="space-y-1">
                    <p className="font-medium">{session.device}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Last active: {new Date(session.lastActive).toLocaleString()}</span>
                      {session.location && <span>Location: {session.location}</span>}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSessionRevoke(session.id)}
                  disabled={isLoading}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Password</AlertDialogTitle>
            <AlertDialogDescription>Enter your current password and choose a new one</AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handlePasswordChange} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <AlertDialogAction type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Change Password
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

