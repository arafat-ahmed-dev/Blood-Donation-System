"use client"

import { useState } from "react"



import { useScrollPosition } from "@/hooks/useScrollPosition"
import { useAuth } from "@/components/auth/auth-provider"
import Logo from "../Logo"
import DesktopNav from "../DesktopNav"
import UserMenu from "../UserMenu"
import MobileNav from "../MobileNav"
import LocationSelector from "../LocationSelector"
import SearchPanel from "./SearchPanel"
import AuthButtons from "../AuthButtons"
import MobileMenuToggle from "../MobileMenuToggle"

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
      />
    </header>
  )
}