"use client"

import { useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"

export function useAuth() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const sendOTP = async (email: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/auth/generateOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to send OTP")
        return false
      }

      return true
    }
    catch (err) {
      setError("An unexpected error occurred")
      return false
    }
    finally {
      setIsLoading(false)
    }
  }
  const login = async (email: string, otp: string , redirect?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        redirect: true,
        email,
        otp,
        callbackUrl: redirect ?? "/",
      })

      if (result?.error) {
        setError(result.error)
        return false
      }

      return true
    } catch (err) {
      setError("An unexpected error occurred")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: any) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Registration failed")
        return false
      }

      // Auto login after registration
      const loginResult = await login(userData.email, userData.otp)
      return loginResult
    } catch (err) {
      setError("An unexpected error occurred")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await signOut({ redirect: false })
      router.push("/")
    } catch (err) {
      setError("Logout failed")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user: session?.user,
    isAuthenticated: !!session?.user,
    isLoading: status === "loading" || isLoading,
    error,
    login,
    register,
    logout,
    sendOTP,
  }
}
