export interface Message {
  id: string
  conversationId: string
  senderId: string
  recipientId: string
  content: string
  timestamp: string
  read: boolean
  type: "text" | "image" | "file"
  metadata?: {
    fileName?: string
    fileSize?: number
    mimeType?: string
    imageUrl?: string
  }
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
  type: "individual" | "group"
  metadata?: {
    groupName?: string
    groupAvatar?: string
    admins?: string[]
  }
}

export type UserRole = "admin" | "user"

export interface Contact {
  id: string
  userId: string
  role: UserRole
  name: string
  avatar?: string
  status: "Online" | "Offline" | "Away"
  lastSeen: string
  department?: string
  specialization?: string
}

