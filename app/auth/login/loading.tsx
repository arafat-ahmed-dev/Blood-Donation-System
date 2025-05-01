"use client"

import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function AuthLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <LoadingSpinner size="lg" text="Preparing authentication..." />
      </div>
    </div>
  )
}
