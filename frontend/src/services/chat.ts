import { ConversationType, MessageSendType, MessageType } from "@/types/conversation";
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

export const sendMessage = async (payload: MessageSendType) => {
  try {
    const response = await apiClient<MessageType>(`/api/send-message`, {
      method: "POST",
      body: JSON.stringify(payload)
    });

    return response;
  } catch (error) {
    throw error;
  }
};
