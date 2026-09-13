import { apiClient, ApiResponseType } from "./apiClient";
import { User } from "@/types/user";

export const getUsers = async (): Promise<ApiResponseType<User[]>> => {
  try {
    const response = await apiClient<User[]>("/api/users", {
      method: "GET",
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (
  id: number,
): Promise<ApiResponseType<User>> => {
  try {
    const response = await apiClient<User>(`/api/users/${id}`, {
      method: "GET",
    });

    return response;
  } catch (error) {
    throw error;
  }
};