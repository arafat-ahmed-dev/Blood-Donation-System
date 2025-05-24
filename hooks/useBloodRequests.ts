"use client";

import { useState, useEffect } from "react";

export function useBloodRequests(filters: any = {}) {
  const [requests, setRequests] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async (page = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      // Build query params
      const params = new URLSearchParams();
      params.append("page", page.toString());

      if (filters.bloodType) params.append("bloodType", filters.bloodType);
      if (filters.status) params.append("status", filters.status);
      if (filters.userId) params.append("userId", filters.userId);

      const response = await fetch(`/api/requests?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch blood requests");
      }

      setRequests(data.requests);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createRequest = async (requestData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create blood request");
      }

      // Refresh the list
      fetchRequests();
      return data.bloodRequest;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [JSON.stringify(filters)]);

  return {
    requests,
    pagination,
    isLoading,
    error,
    fetchRequests,
    createRequest,
  };
}
