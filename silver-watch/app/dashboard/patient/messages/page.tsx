"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Search, ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null) // Track selected chat

  return (
    <DashboardLayout userRole="patient">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Messages</h2>
          <p className="text-muted-foreground">Communicate with your care team</p>
        </div>

        {/* Mobile Responsive Layout */}
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          {/* Contacts List - Hide when chat is open on mobile */}
          <Card className={`md:block ${activeChat ? "hidden md:block" : "block"}`}>
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
              <CardDescription>Your care team</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search contacts..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {contacts.map((contact, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-4 w-full p-4 hover:bg-muted transition-colors border-b last:border-0"
                    onClick={() => setActiveChat(contact.name)} // Open chat on mobile
                  >
                    <Avatar>
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.lastMessage.time}</p>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage.text}</p>
                    </div>
                    {contact.unread > 0 && <Badge variant="default">{contact.unread}</Badge>}
                  </button>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Window - Hide contacts on mobile when chat is open */}
          <Card className={`md:block ${activeChat ? "block" : "hidden md:block"}`}>
            <CardHeader className="border-b">
              <div className="flex items-center gap-4">
                {/* Back button for mobile */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setActiveChat(null)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>

                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{activeChat || "Dr. Sarah Smith"}</CardTitle>
                  <CardDescription>Primary Care Physician</CardDescription>
                </div>
              </div>
            </CardHeader>

            {/* Chat messages */}
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-250px)] p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.sender === "doctor" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[75%] md:max-w-[60%] lg:max-w-[50%] ${
                          message.sender === "doctor" ? "bg-muted" : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "doctor" ? "text-muted-foreground" : "text-primary-foreground/80"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Chat input - Sticky at bottom */}
              <div className="border-t p-4 sticky bottom-0 bg-background">
                <form className="flex gap-2">
                  <Input placeholder="Type your message..." />
                  <Button type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}


const contacts = [
  {
    name: "Dr. Sarah Smith",
    role: "Primary Care Physician",
    avatar: "/placeholder.svg",
    initials: "SS",
    unread: 2,
    lastMessage: {
      text: "How are you feeling today?",
      time: "10:30 AM",
    },
  },
  {
    name: "Nurse Johnson",
    role: "Care Coordinator",
    avatar: "/placeholder.svg",
    initials: "NJ",
    unread: 0,
    lastMessage: {
      text: "Your next appointment is scheduled for...",
      time: "Yesterday",
    },
  },
  {
    name: "Dr. Michael Lee",
    role: "Cardiologist",
    avatar: "/placeholder.svg",
    initials: "ML",
    unread: 0,
    lastMessage: {
      text: "Your test results look good",
      time: "2 days ago",
    },
  },
  {
    name: "Physical Therapy",
    role: "Rehabilitation",
    avatar: "/placeholder.svg",
    initials: "PT",
    unread: 1,
    lastMessage: {
      text: "Don't forget your exercises!",
      time: "3 days ago",
    },
  },
]

const messages = [
  {
    sender: "doctor",
    text: "Good morning! How are you feeling today?",
    time: "10:30 AM",
  },
  {
    sender: "patient",
    text: "Good morning Dr. Smith! I'm feeling better today. The new medication seems to be helping.",
    time: "10:32 AM",
  },
  {
    sender: "doctor",
    text: "That's great to hear! Have you experienced any side effects?",
    time: "10:33 AM",
  },
  {
    sender: "patient",
    text: "No side effects so far. My blood pressure has been more stable too.",
    time: "10:35 AM",
  },
  {
    sender: "doctor",
    text: "Excellent! Keep monitoring and recording your readings. We'll review them at your next appointment.",
    time: "10:36 AM",
  },
]

