"use client"

import Link from "next/link"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NotificationsMenuProps {
  notificationCount: number
}

export function NotificationsMenu({ notificationCount }: NotificationsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hidden md:flex">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
              <span className="text-[10px] font-medium text-primary-foreground">{notificationCount}</span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2 border-b">
          <p className="font-medium">Notifications</p>
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
        </div>
        <NotificationsList />
        <div className="p-2 border-t">
          <Button variant="ghost" size="sm" className="w-full text-center" asChild>
            <Link href="/notifications">View all notifications</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function NotificationsList() {
  const notifications = [
    {
      id: 1,
      type: "urgent",
      badge: "New",
      message: "Urgent request for O+ blood in Mirpur area",
      time: "20 minutes ago",
    },
    {
      id: 2,
      type: "appointment",
      badge: "Update",
      message: "Your donation appointment is confirmed for tomorrow",
      time: "2 hours ago",
    },
    {
      id: 3,
      type: "event",
      badge: "Info",
      message: "Blood donation camp next weekend at Dhanmondi",
      time: "Yesterday",
    },
  ]

  return (
    <div className="py-2 px-1 max-h-80 overflow-y-auto">
      {notifications.map((notification) => (
        <div key={notification.id} className="p-2 hover:bg-accent rounded-md cursor-pointer transition-colors">
          <div className="flex items-start gap-2">
            <Badge variant={notification.type === "urgent" ? "default" : "outline"} className="mt-1">
              {notification.badge}
            </Badge>
            <div>
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
