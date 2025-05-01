"use client"

import { motion } from "framer-motion"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function BloodBankLoading() {
  return (
    <>
      <Header />
      <main className="py-16 bg-gray-50 min-h-[70vh]">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-extrabold mb-4">Blood Banks</h1>
            <p className="text-lg text-muted-foreground">Find blood banks near you and check blood availability</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar skeleton */}
            <div className="lg:col-span-1">
              <motion.div
                className="h-[350px] bg-card rounded-lg shadow-sm animate-pulse"
                animate={{ opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </div>

            {/* Blood banks grid skeleton */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-[250px] bg-card rounded-lg shadow-sm animate-pulse"
                      animate={{ opacity: [0.5, 0.7, 0.5] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <LoadingSpinner text="Loading blood banks..." />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
