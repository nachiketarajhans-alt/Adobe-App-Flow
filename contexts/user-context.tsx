"use client";

import * as React from "react";

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface UserContextType {
  isFirstTimeUser: boolean;
  setIsFirstTimeUser: (value: boolean) => void;
  currentOnboardingStep: number;
  setCurrentOnboardingStep: (step: number) => void;
  completeOnboarding: () => void;
  loading: boolean;
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  isLoadingData: boolean;
  setIsLoadingData: (loading: boolean) => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [isFirstTimeUser, setIsFirstTimeUserState] = React.useState<boolean>(true);
  const [currentOnboardingStep, setCurrentOnboardingStep] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [userData, setUserDataState] = React.useState<UserData | null>(null);
  const [isLoadingData, setIsLoadingData] = React.useState(false);

  React.useEffect(() => {
    // Check localStorage on mount
    const stored = localStorage.getItem("isFirstTimeUser");
    const storedUserData = localStorage.getItem("userData");
    
    if (stored !== null) {
      setIsFirstTimeUserState(stored === "true");
    }
    
    if (storedUserData) {
      try {
        setUserDataState(JSON.parse(storedUserData));
      } catch (e) {
        console.error("Failed to parse userData from localStorage", e);
      }
    }
    
    setLoading(false);
  }, []);

  const setIsFirstTimeUser = React.useCallback((value: boolean) => {
    setIsFirstTimeUserState(value);
    localStorage.setItem("isFirstTimeUser", String(value));
  }, []);

  const setUserData = React.useCallback((data: UserData | null) => {
    setUserDataState(data);
    if (data) {
      localStorage.setItem("userData", JSON.stringify(data));
    } else {
      localStorage.removeItem("userData");
    }
  }, []);

  const completeOnboarding = React.useCallback(() => {
    setIsFirstTimeUser(false);
    localStorage.setItem("isFirstTimeUser", "false");
  }, []);

  return (
    <UserContext.Provider
      value={{
        isFirstTimeUser,
        setIsFirstTimeUser,
        currentOnboardingStep,
        setCurrentOnboardingStep,
        completeOnboarding,
        loading,
        userData,
        setUserData,
        isLoadingData,
        setIsLoadingData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

