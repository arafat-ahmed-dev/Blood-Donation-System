"use client"

import React, { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import type { User } from "next-auth"

interface AuthContextType {
    isAuthenticated: boolean
    user: User | null
    notificationCount: number
    login: () => void
    logout: () => void
}

const initialContext: AuthContextType = {
    isAuthenticated: false,
    user: null,
    notificationCount: 0,
    login: () => { },
    logout: () => { }
}

const AuthContext = createContext<AuthContextType>(initialContext)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>({
        id: "123",
        name: "John Doe",
        email: "john@example.com",
        role: "donor" as string,
        phone: "+1234567890"
    } satisfies User)
    const [notificationCount, setNotificationCount] = useState(3)

    const login = () => setIsAuthenticated(true)
    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        const checkAuth = async () => {
            setIsAuthenticated(true)
        }
        checkAuth()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                notificationCount,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}