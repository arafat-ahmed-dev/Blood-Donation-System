"use client"

import { motion } from "framer-motion"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function ProfileLoading() {
  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50 min-h-[70vh]">
        <div className="container max-w-5xl">
          <div className="flex flex-col items-center justify-center">
            {/* Profile header skeleton */}
            <motion.div
              className="w-full h-[200px] bg-card rounded-lg shadow-sm animate-pulse mb-8"
              animate={{ opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />

            {/* Profile content skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <motion.div
                className="h-[400px] bg-card rounded-lg shadow-sm animate-pulse"
                animate={{ opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.1 }}
              />
              <motion.div
                className="h-[400px] md:col-span-2 bg-card rounded-lg shadow-sm animate-pulse"
                animate={{ opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
              />
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <LoadingSpinner text="Loading profile..." />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
