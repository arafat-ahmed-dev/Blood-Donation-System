"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "primary" | "secondary" | "white"
  text?: string
}

export function LoadingSpinner({ size = "md", color = "primary", text }: LoadingSpinnerProps) {
  // Size mapping
  const sizeMap = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }

  // Color mapping
  const colorMap = {
    primary: "text-primary",
    secondary: "text-secondary",
    white: "text-white",
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <motion.div
          className={`${sizeMap[size]} ${colorMap[color]}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M12 2L8 6H11V14C11 15.1046 10.1046 16 9 16C7.89543 16 7 15.1046 7 14V12C7 9.79086 5.20914 8 3 8V10C4.10457 10 5 10.8954 5 12V14C5 16.2091 6.79086 18 9 18C10.0911 18 11.0645 17.5664 11.7578 16.8713C12.4511 17.5664 13.4245 18 14.5156 18C16.7247 18 18.5156 16.2091 18.5156 14V12C18.5156 10.8954 19.411 10 20.5156 10V8C18.3064 8 16.5156 9.79086 16.5156 12V14C16.5156 15.1046 15.6202 16 14.5156 16C13.411 16 12.5156 15.1046 12.5156 14V6H15.5156L12 2Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </div>
      {text && (
        <motion.p
          className={`mt-4 text-sm font-medium ${colorMap[color]}`}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}
