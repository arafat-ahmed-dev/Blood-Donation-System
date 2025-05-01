"use client"

import { useState, useEffect } from "react"

export function useDonors(filters: any = {}) {
  const [donors, setDonors] = useState([])
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDonors = async (page = 1) => {
    setIsLoading(true)
    setError(null)

    try {
      // Build query params
      const params = new URLSearchParams()
      params.append("page", page.toString())

      if (filters.bloodType) params.append("bloodType", filters.bloodType)
      if (filters.city) params.append("city", filters.city)
      if (filters.upazila) params.append("upazila", filters.upazila)

      const response = await fetch(`/api/donors?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch donors")
      }

      setDonors(data.donors)
      setPagination(data.pagination)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDonors()
  }, [filters])

  return {
    donors,
    pagination,
    isLoading,
    error,
    fetchDonors,
  }
}
