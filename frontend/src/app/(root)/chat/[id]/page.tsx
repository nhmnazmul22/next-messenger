"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { useConversation } from "@/context/ConversationContext";

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: targetUserId } = use(params);
  const {
    conversationMessages,
    isLoading,
    errorMessage,
    fetchConversationMessages,
  } = useConversation();

  useEffect(() => {
    fetchConversationMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      <div className="bg-indigo-600 text-white px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center">
          <Link
            href="/"
            className="p-2 hover:bg-indigo-500 rounded-full transition-colors mr-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>

          <div className="flex items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center text-white font-semibold">
              {targetUserId.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <h2 className="font-semibold">User {targetUserId}</h2>
              <p className="text-xs text-indigo-200">Chat</p>
            </div>
          </div>

          <button className="p-2 hover:bg-indigo-500 rounded-full transition-colors">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-2xl w-full mx-auto bg-white dark:bg-gray-800 flex flex-col shadow-xl min-h-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">
                Loading messages...
              </p>
            </div>
          ) : errorMessage ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-red-600 dark:text-red-400">{errorMessage}</p>
            </div>
          ) : conversationMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">
                No messages yet
              </p>
            </div>
          ) : (
            conversationMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.user_id === Number(targetUserId)
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[75%] ${
                    msg.user_id === Number(targetUserId)
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-r-2xl rounded-tl-2xl"
                      : "bg-indigo-600 text-white rounded-l-2xl rounded-tr-2xl"
                  } px-4 py-2 shadow-sm`}
                >
                  <p className="text-sm">{msg.body}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.user_id === Number(targetUserId)
                        ? "text-gray-500 dark:text-gray-400"
                        : "text-indigo-200"
                    }`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />

            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            <button className="p-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-full transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
