import { ConversationType } from "@/types/conversation";
import { apiClient } from "./apiClient";

export const startConversation = async (targetUserId: number) => {
  try {
    const response = await apiClient<ConversationType>(
      `/api/conversation/${targetUserId}`,
      {
        method: "GET",
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};
