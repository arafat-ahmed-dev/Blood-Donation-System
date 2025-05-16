"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface AuthButtonsProps {
  className?: string
}

export default function AuthButtons({ className = "" }: AuthButtonsProps) {
  return (
    <div className={`flex items-center gap-1 md:gap-1.5 lg:gap-2 ${className}`}>
      <Button variant="ghost" size="sm" asChild className="text-[13px] md:text-sm font-medium px-2 md:px-3">
        <Link href="/auth">Login</Link>
      </Button>
      <Button asChild size="sm" className="text-[13px] md:text-sm font-medium px-2 md:px-3">
        <Link href="/auth/register">Register</Link>
      </Button>
    </div>
  )
}
