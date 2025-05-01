"use client"

import { useState, useEffect } from "react"

export function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchNotifications = async (page = 1) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/notifications?page=${page}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch notifications")
      }

      setNotifications(data.notifications)
      setUnreadCount(data.unreadCount)
      setPagination(data.pagination)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, read: true }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to mark notification as read")
      }

      // Update local state
      setNotifications((prev) =>
        prev.map((notification: any) => (notification.id === id ? { ...notification, read: true } : notification)),
      )
      setUnreadCount((prev) => prev - 1)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const markAllAsRead = async () => {
    try {
      const promises = notifications
        .filter((notification: any) => !notification.read)
        .map((notification: any) => markAsRead(notification.id))

      await Promise.all(promises)
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  return {
    notifications,
    unreadCount,
    pagination,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  }
}
