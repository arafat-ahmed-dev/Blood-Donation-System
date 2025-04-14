"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              {/* Rokto logo with blood drop */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="blood-drop-pulse h-5 w-3 bg-primary rounded-b-full rounded-t-[50%]" />
              </div>
            </div>
            <span className="hidden sm:inline-block text-xl font-bold text-primary">
              ROKTO
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/">
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Find Blood</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[200px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/request">
                          <div className="text-sm font-medium leading-none">Request Blood</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Find blood donors near you
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/donor/search">
                          <div className="text-sm font-medium leading-none">Search Donors</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Search by location and blood type
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/donor/register">
                    Become a Donor
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/about">
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="hidden md:flex">
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button size="sm" className="hidden md:flex">
            <Link href="/auth/register">Register</Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 pt-0 bg-background border-b">
          <nav className="grid gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/request"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request Blood
            </Link>
            <Link
              href="/donor/search"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Search Donors
            </Link>
            <Link
              href="/donor/register"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Become a Donor
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="flex flex-col sm:flex-row gap-2 mt-2 pt-2 border-t">
              <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </Button>
              <Button size="sm" className="w-full sm:w-auto" asChild>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
