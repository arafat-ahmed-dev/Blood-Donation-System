"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { User } from "@/lib/store";
import axios from "axios";

export function useProfile() {
  const { user: sessionUser, isAuthenticated } = useAuth();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/user", {
        withCredentials: true,
      });
      console.log(response.status);
      const data = await response.data;

      if (response.status >= 400) {
        throw new Error(data.error || "Failed to fetch profile");
      }

      setUser(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      // Refresh profile
      fetchProfile();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  return {
    user,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
  };
}
