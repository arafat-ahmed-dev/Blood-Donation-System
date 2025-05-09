"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

type User = {
  id: string
  name: string
  email: string
  bloodType: string
  isAdmin: boolean
  donorLevel?: string
  totalDonations?: number
  lastDonationDate?: Date
  nextEligibleDate?: Date
  image?: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  sendOTP: (email: string) => Promise<{ success: boolean; message?: string }>
  verifyOTP: (email: string, otp: string) => Promise<{ success: boolean; message?: string }>
  register: (userData: any) => Promise<{ success: boolean; message?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  sendOTP: async () => ({ success: false }),
  verifyOTP: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const sendOTP = async (email: string) => {
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      return {
        success: data.success,
        message: data.message,
      }
    } catch (error) {
      console.error("Send OTP error:", error)
      return { success: false, message: "An error occurred while sending OTP" }
    }
  }

  const verifyOTP = async (email: string, otp: string) => {
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })

      const data = await res.json()

      return {
        success: data.success,
        message: data.message,
      }
    } catch (error) {
      console.error("Verify OTP error:", error)
      return { success: false, message: "An error occurred during OTP verification" }
    }
  }

  const register = async (userData: any) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      const data = await res.json()

      return {
        success: !data.error,
        message: data.error || "Registration successful",
      }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, message: "An error occurred during registration" }
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await signOut({ redirect: false })
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      setLoading(false)
    }
  }

  // Map the session user to our User type
  const user = session?.user
    ? {
      id: session.user.id as string,
      name: session.user.name || "",
      email: session.user.email || "",
      bloodType: (session.user.bloodType as string) || "",
      isAdmin: (session.user.isAdmin as boolean) || false,
      image: session.user.image || undefined,
    }
    : null

  const contextValue = {
    user,
    isAuthenticated: !!session,
    isLoading: status === "loading" || loading,
    sendOTP,
    verifyOTP,
    register,
    logout,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
