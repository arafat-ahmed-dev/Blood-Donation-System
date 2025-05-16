"use client"

import React from "react"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, User, ChevronRight, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AuthButtons from "./AuthButtons"

import { Separator } from "../ui/separator"
import { useAuth } from "../auth/auth-provider"

// Animation variants
const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.07,
    },
  },
}

const menuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
}

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  isAuthenticated: boolean
  user: {
    name?: string
    image?: string
    initials?: string
    bloodType?: string
    isAdmin?: boolean
  }
}

export default function MobileNav({ isOpen, onClose, isAuthenticated, user }: MobileNavProps) {
  const { logout } = useAuth()
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={menuVariants}
          className="md:hidden p-4 pt-0 bg-background border-b"
        >
          <div className="py-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search donors, blood banks..." aria-label="Search" />
            </div>
          </div>

          <nav className="grid gap-1 py-2" aria-label="Mobile navigation">
            <MobileNavItem href="/" label="Home" onClose={onClose} />

            <MobileNavSection title="Find Blood">
              <MobileNavItem href="/request" label="Request Blood" onClose={onClose} />
              <MobileNavItem href="/donor/search" label="Search Donors" onClose={onClose} />
              <MobileNavItem href="/blood-bank" label="Blood Banks" onClose={onClose} />
            </MobileNavSection>

            <MobileNavSection title="Resources">
              <MobileNavItem href="/become-blood-donor" label="Become a Donor" onClose={onClose} />
              <MobileNavItem href="/blog" label="Blog & News" onClose={onClose} />
              <MobileNavItem href="/donation-centers" label="Donation Centers" onClose={onClose} />
              <MobileNavItem href="/blood-education" label="Blood Education" onClose={onClose} />
            </MobileNavSection>

            <MobileNavItem href="/about" label="About" onClose={onClose} />

            {!isAuthenticated ? (
              <motion.div variants={menuItemVariants} className="mt-3 pt-3 border-t">
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.image || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback>{user?.initials || initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user?.bloodType || "Unknown"} Blood Donor</p>
                  </div>
                </div>
                <MobileNavItem
                  href="/profile"
                  label="My Profile"
                  icon={<User className="h-4 w-4" />}
                  onClose={onClose}
                />
                {
                  user?.isAdmin && (
                    <MobileNavItem
                      href="/admin/dashboard"
                      label="Admin Panel"
                      icon={<User className="h-4 w-4" />}
                      onClose={onClose}
                    />
                  )
                }
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 rounded-md hover:bg-accent text-sm text-destructive"
                  onClick={() => {
                    logout()
                    onClose()
                  }}
                >
                  <LogOut className=" h-4 w-4" />
                  Logout
                </Button>
              </motion.div>
            ) : (
              <motion.div variants={menuItemVariants} className="flex flex-col sm:flex-row gap-2 mt-3 pt-3 border-t">
                <AuthButtons />
              </motion.div>
            )}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface MobileNavItemProps {
  href: string
  label: string
  icon?: React.ReactNode
  badge?: number
  onClose: () => void
}

function MobileNavItem({ href, label, icon, badge, onClose }: MobileNavItemProps) {
  return (
    <motion.div variants={menuItemVariants}>
      <Link
        href={href}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
        onClick={onClose}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {icon && icon}
            <span>{label}</span>
            {badge && (
              <Badge variant="secondary" className="ml-auto">
                {badge}
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

interface MobileNavSectionProps {
  title: string
  children: React.ReactNode
}

function MobileNavSection({ title, children }: MobileNavSectionProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <motion.div variants={menuItemVariants}>
      <div className="flex flex-col px-2 py-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-1 py-1 font-medium text-sm w-full text-left"
        >
          {title}
          <ChevronRight
            className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-90' : ''}`}
          />
        </button>
        {isOpen && (
          <div className="space-y-1 pl-2">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  )
}