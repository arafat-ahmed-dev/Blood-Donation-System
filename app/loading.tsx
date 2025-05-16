"use client";

import { motion } from "framer-motion";
import { ProjectLoader } from "@/components/ui/project-loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectLoader
            variant="droplet"
            size="xl"
            text="Loading Content"
            secondaryText="Please wait while we prepare your experience"
            showProgress
          />
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-0 right-0 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Rokto Shetu - Connecting Lives Through Blood Donation
        </motion.div>
      </div>
    </div>
  );
}
