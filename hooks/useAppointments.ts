"use client";

import { useState, useEffect } from "react";

export function useAppointments(userId?: string) {
  const [appointments, setAppointments] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async (page = 1) => {
    if (!userId) return; // Don't fetch if no userId

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("userId", userId);

      const response = await fetch(`/api/appointments?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch appointments");
      }

      setAppointments(data.appointments);
      setPagination(data.pagination);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching appointments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const createAppointment = async (appointmentData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create appointment");
      }

      // Refresh the list
      await fetchAppointments();
      return data.appointment;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Only fetch appointments when userId changes
  useEffect(() => {
    if (userId) {
      fetchAppointments();
    }
  }, [userId]);

  return {
    appointments,
    pagination,
    isLoading,
    error,
    fetchAppointments,
    createAppointment,
  };
}
