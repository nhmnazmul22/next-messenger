"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getConversationByUserId, sendMessage } from "@/services/chat";
import { ConversationType, MessageType } from "@/types/conversation";
import { User } from "@/types/user";
import { handleError } from "@/utils/error";
import { useAuth } from "@/context/AuthContextProvider";

type UseConversationReturn = {
  conversation: ConversationType | null;
  message: string;
  messages: MessageType[];
  targetUser: User | null;
  isLoading: boolean;
  errorMessage: string | null;
  setMessage: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
};

export const useConversation = (
  targetUserId: string,
): UseConversationReturn => {
  const [conversation, setConversation] = useState<ConversationType | null>(
    null,
  );
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { userInfo } = useAuth();
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = async () => {
    setErrorMessage(null);
    try {
      if (!userInfo?.id || !targetUserId || !conversation?.id) {
        throw new Error("Id not found");
      }

      const response = await sendMessage({
        senderId: userInfo?.id,
        receiverId: Number(targetUserId),
        body: message,
        conversationId: conversation?.id,
      });

      if (!response.success || !response.data) {
        throw new Error(response.message ?? "Failed to load users");
      }

      setMessages((prev) => [...prev, response.data as MessageType]);
    } catch (error) {
      setErrorMessage(handleError(error).message);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await getConversationByUserId(
          Number.parseInt(targetUserId),
        );

        if (!response.success || !response.data) {
          throw new Error(response.message ?? "Failed to load conversation");
        }

        if (!cancelled) {
          setConversation(response.data.conversation);
          setMessages(response.data.messages);
          setTargetUser(response.data.users);
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(handleError(error).message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [targetUserId]);

  return {
    conversation,
    message,
    messages,
    targetUser,
    isLoading,
    errorMessage,
    setMessage,
    handleSendMessage,
  };
};
