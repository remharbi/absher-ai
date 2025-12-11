"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { generateUserData } from "@/lib/userData";

const UserDataContext = createContext({
  userData: null,
  ready: false,
  refreshUserData: () => {},
});

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(null);

  const refreshUserData = () => {
    setUserData(generateUserData());
  };

  useEffect(() => {
    // Generate randomized data on the client to avoid hydration issues
    refreshUserData();
  }, []);

  const value = useMemo(
    () => ({
      userData,
      ready: Boolean(userData),
      refreshUserData,
    }),
    [userData]
  );

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
}

export function useUserData() {
  return useContext(UserDataContext);
}
