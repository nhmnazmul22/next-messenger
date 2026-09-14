"use client";

import { getConversationMessages } from "@/services/chat";
import { ConversationType, MessageType } from "@/types/conversation";
import { handleError } from "@/utils/error";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type ConversationContextType = {
  isLoading: boolean;
  conversation: ConversationType | null;
  conversationMessages: MessageType[] | [];
  errorMessage: string | null;

  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setConversation: Dispatch<SetStateAction<ConversationType | null>>;
  setConversationMessages: Dispatch<SetStateAction<MessageType[] | []>>;
  fetchConversationMessages: () => void;
};

export const ConversationContext =
  createContext<ConversationContextType | null>(null);

export const ConversationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [conversation, setConversation] = useState<ConversationType | null>(
    null,
  );
  const [conversationMessages, setConversationMessages] = useState<
    MessageType[] | []
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchConversationMessages = async () => {
    setIsLoading(true);
    try {
      if (!conversation || !conversation?.id) {
        throw new Error("Conversation not found");
      }

      const response = await getConversationMessages(conversation?.id);

      if (!response.success || !response.data) {
        throw new Error(response.message ?? "Failed to load conversation");
      }

      console.log("messages", response);
      setConversationMessages(response.data);
    } catch (error) {
      setErrorMessage(handleError(error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConversationContext.Provider
      value={{
        isLoading,
        conversation,
        conversationMessages,
        errorMessage,

        setIsLoading,
        setConversation,
        setConversationMessages,
        fetchConversationMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    throw new Error(
      "useConversation must be used inside ConversationContextProvider",
    );
  }

  return context;
};
