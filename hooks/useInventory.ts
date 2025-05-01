"use client"

import { useState, useEffect } from "react"

export function useInventory() {
  const [inventory, setInventory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchInventory = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/inventory")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch inventory")
      }

      setInventory(data.inventory)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  return {
    inventory,
    isLoading,
    error,
    fetchInventory,
  }
}
