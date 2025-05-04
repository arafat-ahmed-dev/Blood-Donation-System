"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"

import Logo from "./Logo"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"
import MobileMenuToggle from "./MobileMenuToggle"
import LocationSelector from "./LocationSelector"
import UserMenu from "./UserMenu"
import AuthButtons from "./AuthButtons"
import { NotificationsMenu } from "./NotificationsMenu"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isAuthenticated } = useAuth()
  const [notificationCount, setNotificationCount] = useState(3)

  const userInfo = {
    name: user?.name ?? undefined,
    image: user?.image ?? undefined,
    initials: undefined,         // or user?.initials if available
    bloodType: undefined,        // or user?.bloodType if available
    isAdmin: undefined,          // or user?.isAdmin if available
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex w-full justify-between items-center gap-4 ">
          <Logo />
          <LocationSelector />
          <div className="flex items-center md:hidden">
            <NotificationsMenu notificationCount={notificationCount} />
            <MobileMenuToggle isOpen={isMobileMenuOpen} onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </div>
        </div>

        <DesktopNav />
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <UserMenu user={userInfo} notificationCount={notificationCount} />
          ) : (
            <AuthButtons className="hidden md:flex" />
          )}
        </div>
      </div>

      {/* <NotificationsMenu notificationCount={notificationCount} /> */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        user={userInfo}
      // notificationCount={notificationCount}
      />
    </header>
  )
}
