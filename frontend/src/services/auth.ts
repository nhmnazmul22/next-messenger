import { LoginType, RegisterType } from "@/types/auth";
import { apiClient, ApiResponseType } from "./apiClient";
import { User } from "@/types/user";

export const registerUser = async <T extends object>(
  data: RegisterType,
): Promise<ApiResponseType<T>> => {
  try {
    const response = await apiClient<T>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async <T extends object>(
  data: LoginType,
): Promise<ApiResponseType<T>> => {
  try {
    const response = await apiClient<T>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const csrfToken = async () => {
  try {
    await apiClient("/sanctum/csrf-cookie", {
      method: "GET",
    });
  } catch (error) {
    throw error;
  }
};

export const getProfile = async (): Promise<ApiResponseType<User>> => {
  try {
    const response = await apiClient<User>("/api/auth/me", {
      method: "GET",
    });

    return response;
  } catch (error) {
    throw error;
  }
};
