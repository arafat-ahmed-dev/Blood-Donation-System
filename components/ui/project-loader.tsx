"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type LoaderVariant =
  | "pulse"
  | "droplet"
  | "wave"
  | "heartbeat"
  | "donation"
  | "fullscreen";

export type LoaderSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ProjectLoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  text?: string;
  secondaryText?: string;
  className?: string;
  overlay?: boolean;
  fullPage?: boolean;
  showProgress?: boolean;
  progress?: number;
  transparent?: boolean;
  hideAfter?: number;
}

export function ProjectLoader({
  variant = "droplet",
  size = "md",
  text,
  secondaryText,
  className,
  overlay = false,
  fullPage = false,
  showProgress = false,
  progress = 0,
  transparent = false,
  hideAfter,
}: ProjectLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [localProgress, setLocalProgress] = useState(progress);

  // Auto-hide functionality
  useEffect(() => {
    if (hideAfter && hideAfter > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, hideAfter);
      return () => clearTimeout(timer);
    }
  }, [hideAfter]);

  // Simulate progress when no real progress is provided
  useEffect(() => {
    if (showProgress && progress === 0) {
      const interval = setInterval(() => {
        setLocalProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return prev;
          }
          const increment = Math.random() * 10;
          return Math.min(prev + increment, 95);
        });
      }, 800);
      return () => clearInterval(interval);
    } else {
      setLocalProgress(progress);
    }
  }, [showProgress, progress]);

  // Size mapping
  const sizeMap: Record<LoaderSize, string> = {
    xs: "h-6 w-6",
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  const textSizeMap: Record<LoaderSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl font-bold",
  };

  const containerClasses = cn(
    "flex flex-col items-center justify-center",
    overlay && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
    fullPage && "h-screen w-screen",
    className
  );

  // Return null if hidden
  if (!isVisible) return null;

  return (
    <AnimatePresence mode="wait">
      <div className={containerClasses}>
        <div className="relative">
          {/* Droplet Loader */}
          {variant === "droplet" && (
            <motion.div
              className={cn(
                sizeMap[size],
                "relative flex items-center justify-center"
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute rounded-full bg-gradient-to-b from-red-500 to-red-600"
                style={{
                  width: "100%",
                  height: "100%",
                  filter: "drop-shadow(0 0 4px rgba(239, 68, 68, 0.4))",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <svg
                viewBox="0 0 24 24"
                className="relative z-10 w-full h-full text-white"
              >
                <path
                  d="M12 21C16.4183 21 20 17.4183 20 13C20 9.5 17.5 6 12 2C6.5 6 4 9.5 4 13C4 17.4183 7.58172 21 12 21Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          )}

          {/* Heartbeat Loader */}
          {variant === "heartbeat" && (
            <motion.div
              className={cn(sizeMap[size], "text-red-500")}
              animate={{
                scale: [1, 1.2, 1, 1.2, 1],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M19.5 12.572L12 20L4.5 12.572C3.83333 11.9053 3.5 11.239 3.5 10.5C3.5 9.11929 4.61929 8 6 8C7.35687 8 8 9 8.5 9.5L12 13L15.5 9.5C16 9 16.6431 8 18 8C19.3807 8 20.5 9.11929 20.5 10.5C20.5 11.239 20.1667 11.9053 19.5 12.572Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
          )}

          {/* Pulse Loader */}
          {variant === "pulse" && (
            <div className={cn(sizeMap[size], "relative")}>
              <motion.div
                className="absolute inset-0 rounded-full bg-red-500/50"
                animate={{
                  scale: [1, 2],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  times: [0, 1],
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-red-500/50"
                animate={{
                  scale: [1, 2],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  times: [0, 1],
                  delay: 0.4,
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-red-500"
                animate={{
                  scale: [0.9, 1.1, 0.9],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full text-white">
                  <path
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                    fill="currentColor"
                  />
                </svg>
              </motion.div>
            </div>
          )}

          {/* Wave Loader */}
          {variant === "wave" && (
            <div className={cn("flex items-end gap-1", sizeMap[size])}>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-red-500 rounded-sm w-1.5"
                  style={{ height: "30%" }}
                  animate={{
                    height: ["30%", "100%", "30%"],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
          )}

          {/* Donation Loader */}
          {variant === "donation" && (
            <div className={cn("relative", sizeMap[size])}>
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M12 2L8 6H11V14C11 15.1046 10.1046 16 9 16C7.89543 16 7 15.1046 7 14V12C7 9.79086 5.20914 8 3 8V10C4.10457 10 5 10.8954 5 12V14C5 16.2091 6.79086 18 9 18C10.0911 18 11.0645 17.5664 11.7578 16.8713C12.4511 17.5664 13.4245 18 14.5156 18C16.7247 18 18.5156 16.2091 18.5156 14V12C18.5156 10.8954 19.411 10 20.5156 10V8C18.3064 8 16.5156 9.79086 16.5156 12V14C16.5156 15.1046 15.6202 16 14.5156 16C13.411 16 12.5156 15.1046 12.5156 14V6H15.5156L12 2Z"
                  fill="#ef4444"
                />
              </svg>
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                animate={{
                  y: [0, "100%", "100%", 0],
                  backgroundColor: [
                    "rgba(239, 68, 68, 0)",
                    "rgba(239, 68, 68, 0.7)",
                    "rgba(239, 68, 68, 0.7)",
                    "rgba(239, 68, 68, 0)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          )}

          {/* Fullscreen Loader */}
          {variant === "fullscreen" && (
            <div className="flex flex-col items-center">
              <motion.div
                className={cn("relative", sizeMap[size])}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-500/30"
                  animate={{
                    scale: [1, 1.5],
                    opacity: [0.7, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <svg viewBox="0 0 24 24" className="w-full h-full text-red-500">
                  <path
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 21C16.4183 21 20 17.4183 20 13C20 9.5 17.5 6 12 2C6.5 6 4 9.5 4 13C4 17.4183 7.58172 21 12 21Z"
                    fill="currentColor"
                  />
                </svg>
              </motion.div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <motion.div
            className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-red-500"
              initial={{ width: 0 }}
              animate={{ width: `${localProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}

        {/* Text */}
        {text && (
          <motion.p
            className={cn("mt-4 font-medium text-center", textSizeMap[size])}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}

        {/* Secondary Text */}
        {secondaryText && (
          <motion.p
            className={cn("mt-1 text-muted-foreground text-sm text-center")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {secondaryText}
          </motion.p>
        )}
      </div>
    </AnimatePresence>
  );
}
