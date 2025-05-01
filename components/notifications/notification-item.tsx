"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Award, Bell, Calendar, CheckCircle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Notification } from "@/lib/store"

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getIcon = () => {
    switch (notification.type) {
      case "Appointment":
        return <Calendar className="h-5 w-5 text-blue-600" />
      case "Eligibility":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "Urgent":
        return <Heart className="h-5 w-5 text-red-600" />
      case "Achievement":
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <Bell className="h-5 w-5 text-slate-600" />
    }
  }

  const formattedDate = notification.date ? formatDistanceToNow(new Date(notification.date), { addSuffix: true }) : ""

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors",
        !notification.read && "bg-muted/30",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className={cn("font-medium", !notification.read && "font-semibold")}>{notification.title}</p>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>
      </div>
      {!notification.read && isHovered && (
        <Button variant="ghost" size="sm" className="h-8 self-start" onClick={() => onMarkAsRead(notification.id)}>
          Mark read
        </Button>
      )}
    </div>
  )
}
