"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthPage() {
  // authenticate user not allow
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push(`/profile`);
    }
  }, [status, router]);

  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-b from-white to-blood-50 dark:from-gray-950 dark:to-blood-950/30 bg-blood-pattern">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8 flex flex-col items-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Image src="/logo.svg" height={32} width={32} alt="logo" />
            <h1 className="text-3xl font-bold ml-2 blood-gradient-text">
              Rokto Shetu
            </h1>
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Join our blood donation community
          </p>
        </motion.div>

        <AuthForm />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.div>
      </motion.div>
    </div>
  );
}
