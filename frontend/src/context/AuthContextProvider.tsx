"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import { getProfile } from "@/services/auth";
import { User } from "@/types/user";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type AuthContextType = {
  userInfo: User | null;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const fetchUserInfo = async () => {
    const response = await getProfile();

    if (!response.success || !response.data) {
      toast.error(response.message ?? "User not found");
      return;
    }

    setUserInfo(response.data);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const isAuthenticated = Boolean(userInfo?.email && userInfo.id);

  return (
    <AuthContext.Provider value={{ userInfo, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
