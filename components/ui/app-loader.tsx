"use client";

import React, { useEffect, useState } from "react";
import {
  ProjectLoader,
  LoaderVariant,
  LoaderSize,
} from "@/components/ui/project-loader";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// App loader contexts for different parts of the application
export type LoaderContext =
  | "donation"
  | "profile"
  | "appointments"
  | "eligibility"
  | "verification"
  | "auth"
  | "general";

interface AppLoaderProps {
  active: boolean;
  context?: LoaderContext;
  overlay?: boolean;
  fullscreen?: boolean;
  size?: LoaderSize;
  text?: string;
  className?: string;
  timeout?: number;
  onTimeout?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
  showProgress?: boolean;
}

export function AppLoader({
  active,
  context = "general",
  overlay = false,
  fullscreen = false,
  size = "md",
  text,
  className,
  timeout,
  onTimeout,
  dismissible = false,
  onDismiss,
  showProgress = false,
}: AppLoaderProps) {
  const [visible, setVisible] = useState(active);
  const [timeoutReached, setTimeoutReached] = useState(false);

  // Manage visibility based on active prop
  useEffect(() => {
    setVisible(active);
    if (active) {
      setTimeoutReached(false);
    }
  }, [active]);

  // Handle timeout if specified
  useEffect(() => {
    if (!active || !timeout) return;

    const timer = setTimeout(() => {
      setTimeoutReached(true);
      if (onTimeout) onTimeout();
    }, timeout);

    return () => clearTimeout(timer);
  }, [active, timeout, onTimeout]);

  // Get variant and text based on context
  const getContextDetails = (
    context: LoaderContext
  ): {
    variant: LoaderVariant;
    defaultText: string;
    secondaryText?: string;
  } => {
    switch (context) {
      case "donation":
        return {
          variant: "donation",
          defaultText: "Processing Donation",
          secondaryText: "Thank you for your contribution",
        };
      case "profile":
        return {
          variant: "pulse",
          defaultText: "Loading Profile",
          secondaryText: "Retrieving your information",
        };
      case "appointments":
        return {
          variant: "wave",
          defaultText: "Managing Appointments",
          secondaryText: "Organizing your schedule",
        };
      case "eligibility":
        return {
          variant: "heartbeat",
          defaultText: "Checking Eligibility",
          secondaryText: "Analyzing your health information",
        };
      case "verification":
        return {
          variant: "droplet",
          defaultText: "Verifying Information",
          secondaryText: "This will only take a moment",
        };
      case "auth":
        return {
          variant: "fullscreen",
          defaultText: "Authenticating",
          secondaryText: "Securely verifying your identity",
        };
      default:
        return {
          variant: "pulse",
          defaultText: "Loading",
          secondaryText: "Please wait",
        };
    }
  };

  const { variant, defaultText, secondaryText } = getContextDetails(context);
  const displayText = text || defaultText;

  const containerClasses = cn(
    "transition-all duration-300",
    overlay &&
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center",
    fullscreen &&
      !overlay &&
      "w-full h-full min-h-[200px] flex items-center justify-center",
    !fullscreen && !overlay && "inline-flex",
    className
  );

  // Handle dismiss
  const handleDismiss = () => {
    if (dismissible && onDismiss) {
      setVisible(false);
      onDismiss();
    }
  };

  if (!visible) return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={containerClasses}
          onClick={dismissible ? handleDismiss : undefined}
        >
          {timeoutReached ? (
            <div className="text-center p-4">
              <p className="text-sm text-muted-foreground mb-2">
                This is taking longer than expected.
              </p>
              {dismissible && (
                <button
                  onClick={onDismiss}
                  className="text-sm text-primary hover:underline focus:outline-none"
                >
                  Click to dismiss
                </button>
              )}
            </div>
          ) : (
            <ProjectLoader
              variant={variant}
              size={size}
              text={displayText}
              secondaryText={secondaryText}
              showProgress={showProgress}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
