"use client"

import Link from "next/link"
import { Heart, Menu, Droplet, BookOpen, MapPin, Newspaper, User, LogOut, LineChart } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NotificationsMenu } from "./NotificationsMenu"
import { useAuth } from "@/hooks/useAuth"
import { useState } from "react"
import { NotificationCenter } from "../notifications/notification-center"
import { DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"

interface UserMenuProps {
  user: {
    name?: string
    firstName?: string
    avatarUrl?: string
    initials?: string
    bloodType?: string
    isAdmin?: boolean
  }
  notificationCount: number
}

export default function UserMenu({ user, notificationCount }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")


  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
  }
  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <NotificationsMenu notificationCount={notificationCount} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.avatarUrl || initials}
                    alt={user?.name || ""}
                  />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.bloodType}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/appointments">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Appointments</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/analytics">
                  <LineChart className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </DropdownMenuItem>
              {user?.isAdmin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin/dashboard">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link href="/auth">Sign In</Link>
          </Button>
          <Button className="hidden md:flex bg-red-600 hover:bg-red-700" asChild>
            <Link href="/auth">Donate Now</Link>
          </Button>
        </>
      )}
    </div>
  )
}
