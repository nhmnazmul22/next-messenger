import { ConversationType, MessageType } from "@/types/conversation";
import { User } from "@/types/user";
import { apiClient } from "./apiClient";

export type ConversationData = {
  conversation: ConversationType;
  messages: MessageType[];
  users: User;
};

export const getConversationByUserId = async (targetUserId: number) => {
  try {
    const response = await apiClient<ConversationData>(
      `/api/conversation/${targetUserId}/messages`,
      {
        method: "GET",
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};