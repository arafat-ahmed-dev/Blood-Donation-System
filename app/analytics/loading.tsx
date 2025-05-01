"use client"

import { motion } from "framer-motion"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function AnalyticsLoading() {
  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50 min-h-[70vh]">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold mb-4">Analytics Dashboard</h1>
            <p className="text-lg text-muted-foreground">View donation trends, donor retention, and inventory usage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <motion.div
                  key={i}
                  className="h-[150px] bg-card rounded-lg shadow-sm animate-pulse"
                  animate={{ opacity: [0.5, 0.7, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1,
                  }}
                />
              ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <motion.div
                  key={i}
                  className="h-[350px] bg-card rounded-lg shadow-sm animate-pulse"
                  animate={{ opacity: [0.5, 0.7, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.1 + 0.3,
                  }}
                />
              ))}
          </div>

          <div className="flex justify-center mt-12">
            <LoadingSpinner text="Loading analytics data..." />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
