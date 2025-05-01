"use client"

import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuToggleProps {
  isOpen: boolean
  onToggle: () => void
}

export default function MobileMenuToggle({ isOpen, onToggle }: MobileMenuToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label="Toggle menu"
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  )
}
