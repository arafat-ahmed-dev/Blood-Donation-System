"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import { getInitials } from "@/lib/utils"

import Logo from "./Logo"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"
import MobileMenuToggle from "./MobileMenuToggle"
import LocationSelector from "./LocationSelector"
import UserMenu from "./UserMenu"
import AuthButtons from "./AuthButtons"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isAuthenticated } = useAuth()
  const [notificationCount, setNotificationCount] = useState(3)

  const userInfo = user
    ? {
        name: `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        avatarUrl: user.image,
        initials: getInitials(`${user.firstName} ${user.lastName}`),
        bloodType: user.bloodType,
      }
    : {
        name: "",
        firstName: "",
        avatarUrl: "",
        initials: "",
        bloodType: "",
      }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileMenuToggle isOpen={isMobileMenuOpen} onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          <Logo />
          <LocationSelector />
        </div>

        <DesktopNav />

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-40 lg:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="pl-8 h-9 md:w-40 lg:w-64" />
          </div>

          {isAuthenticated ? (
            <UserMenu user={userInfo} notificationCount={notificationCount} />
          ) : (
            <AuthButtons className="hidden md:flex" />
          )}
        </div>
      </div>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        user={userInfo}
        notificationCount={notificationCount}
      />
    </header>
  )
}
