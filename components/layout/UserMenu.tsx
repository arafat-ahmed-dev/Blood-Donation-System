"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NotificationsMenu } from "./NotificationsMenu"
import { useAuth } from "@/hooks/useAuth"

interface UserMenuProps {
  user: {
    name?: string
    firstName?: string
    avatarUrl?: string
    initials?: string
    bloodType?: string
  }
  notificationCount: number
}

export default function UserMenu({ user, notificationCount }: UserMenuProps) {
  const { logout } = useAuth()
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
  return (
    <div className="flex items-center gap-3">
      <NotificationsMenu notificationCount={notificationCount} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback>{user?.initials || initials}</AvatarFallback>
            </Avatar>
            <span>{user?.firstName || "User"}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="p-2 border-b">
            <p className="font-medium">{user?.name || "User"}</p>
            <p className="text-sm text-muted-foreground">{user?.bloodType} Blood Donor</p>
          </div>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              My Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/donation-history" className="cursor-pointer">
              Donation History
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-destructive" onClick={logout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
