"use client";

/* eslint-disable react-hooks/set-state-in-effect */
import { getProfile } from "@/services/auth";
import { User } from "@/types/user";
import { handleError } from "@/utils/error";
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
  isAuthLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const fetchUserInfo = async () => {
    setIsAuthLoading(true);
    try {
      const response = await getProfile();

      if (!response.success || !response.data) {
        throw new Error(response.message ?? "User not found");
      }

      setUserInfo(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const isAuthenticated = Boolean(userInfo?.email && userInfo.id);

  return (
    <AuthContext.Provider value={{ userInfo, isAuthenticated, isAuthLoading }}>
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
