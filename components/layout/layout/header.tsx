"use client"

import { useState } from "react"
import Logo from "@/components/header/Logo"
import DesktopNav from "@/components/header/DesktopNav"
import MobileNav from "@/components/header/MobileNav"
import UserMenu from "@/components/header/UserMenu"
import AuthButtons from "@/components/header/AuthButtons"
import SearchPanel from "@/components/layout/SearchPanel"
import LocationSelector from "@/components/header/LocationSelector"
import MobileMenuToggle from "@/components/header/MobileMenuToggle"
import { useScrollPosition } from "@/hooks/useScrollPosition"
import { useAuth } from "@/hooks/useAuth"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { isScrolled } = useScrollPosition()
  // const { isAuthenticated, user, notificationCount } = useAuth()
  const isAuthenticated = true;
  const notificationCount = 10;
  const user = {
    "name": "Arafat Ahmed",
    "firstName": "Arafat",
    "avatarUrl": "string",
    "initials": "string",
    "bloodType": "A+",
  }

  // Don't render authenticated UI if user is null
  const showAuthenticatedUI = isAuthenticated && user !== null

  return (
    <header className={`sticky top-0 z-50 w-full backdrop-blur transition-all duration-300 ${isScrolled ? "border-b shadow-sm bg-background/95 supports-[backdrop-filter]:bg-background/60" : "bg-background"
      }`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo />
          <LocationSelector />
        </div>

        <DesktopNav />

        <div className="flex items-center gap-2">
          <SearchPanel isOpen={searchOpen} onOpenChange={setSearchOpen} />

          {showAuthenticatedUI ? (
            <UserMenu
              user={user ?? {}}
              notificationCount={notificationCount}
            />
          ) : (
            <AuthButtons className="hidden md:flex" />
          )}

          <MobileMenuToggle
            isOpen={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </div>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        isAuthenticated={showAuthenticatedUI}
        user={user ?? {}}
        notificationCount={notificationCount}
      />
    </header>
  )
}