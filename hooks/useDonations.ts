"use client"

import { useState, useEffect } from "react"

export function useDonations(userId?: string) {
  const [donations, setDonations] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDonations = async (page = 1) => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams()
      params.append("page", page.toString())
      if (userId) params.append("userId", userId)

      const response = await fetch(`/api/donations?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch donations")
      }

      setDonations(data.donations)
      setPagination(data.pagination)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createDonation = async (donationData: any) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create donation")
      }

      // Refresh the list
      fetchDonations()
      return data.donation
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDonations()
  }, [userId])

  return {
    donations,
    pagination,
    isLoading,
    error,
    fetchDonations,
    createDonation,
  }
}
