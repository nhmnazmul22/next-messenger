import { LoginType, RegisterType } from "@/types/auth";
import { apiClient } from "./apiClient";

export const registerUser = async <T extends object>(
  data: RegisterType,
): Promise<T> => {
  try {
    const response = await apiClient("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async <T extends object>(
  data: LoginType,
): Promise<T> => {
  try {
    // Call the csrf token endpoint to get the CSRF token
    await apiClient("/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
    });

    const response = await apiClient("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("response", response)
    return response;
  } catch (error) {
    throw error;
  }
};
