"use client";

import { useEffect } from "react";
import { getEcho } from "@/lib/echo";

export default function TestingPage() {
  useEffect(() => {
    const echo = getEcho();

    if (!echo) {
      return;
    }

    const pusher = echo.connector.pusher;

    pusher.send_event(
      "message.send",
      JSON.stringify({
        conversationId: 1,
        body: "Hello from WebSocket",
      }),
      "private-conversation.1",
    );

    return () => {
      echo.leave("private-conversation.1");
    };
  }, []);

  return <div>Sending WebSocket message...</div>;
}
