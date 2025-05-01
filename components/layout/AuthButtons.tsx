"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface AuthButtonsProps {
  className?: string
}

export default function AuthButtons({ className = "" }: AuthButtonsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button variant="outline" size="sm" asChild>
        <Link href="/auth/login">Login</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/auth/register">Register</Link>
      </Button>
    </div>
  )
}
