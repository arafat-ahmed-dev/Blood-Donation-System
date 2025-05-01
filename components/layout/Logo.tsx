"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const bloodDropVariants = {
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <div className="relative h-8 w-8">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          variants={bloodDropVariants}
          animate="pulse"
        >
          <Image src="/logo.svg" alt="Rokto Shetu Logo" width={32} height={32} className="h-8 w-8 rounded-full" />
        </motion.div>
      </div>
      <span className="hidden sm:inline-block text-xl font-bold text-primary">Rokto Shetu</span>
    </Link>
  )
}
