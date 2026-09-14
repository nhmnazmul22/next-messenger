"use client";

import { ConversationType, MessageType } from "@/types/conversation";
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

  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setConversation: Dispatch<SetStateAction<ConversationType | null>>;
  setConversationMessages: Dispatch<SetStateAction<MessageType[] | []>>;
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

  return (
    <ConversationContext.Provider
      value={{
        isLoading,
        conversation,
        conversationMessages,
        setIsLoading,
        setConversation,
        setConversationMessages,
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
