"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUserData } from "../UserDataProvider/UserDataProvider";

const ProactiveContext = createContext({
  recommendations: [],
  error: "",
  loading: false,
});

export function ProactiveProvider({ children }) {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData, ready: userDataReady } = useUserData();

  useEffect(() => {
    if (!userDataReady) return;
    setLoading(true);
    const load = async () => {
      try {
        const res = await fetch("/api/proactive", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userData }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load recommendations");
        setRecommendations(data.recommendations || []);
        setError("");
      } catch (err) {
        setError("proactive.error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userData, userDataReady]);

  const value = useMemo(
    () => ({
      recommendations,
      error,
      loading,
    }),
    [recommendations, error, loading]
  );

  return <ProactiveContext.Provider value={value}>{children}</ProactiveContext.Provider>;
}

export function useProactiveRecommendations() {
  return useContext(ProactiveContext);
}
