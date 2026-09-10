import { RegisterUserType } from "@/types/auth";
import { apiClient } from "./apiClient";

export const registerUser = async <T extends object>(
  data: RegisterUserType,
): Promise<T> => {
  try {
    const response = await apiClient("/auth/register", {
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
