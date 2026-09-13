"use client";

import { useEffect } from "react";
import { getEcho } from "@/lib/echo";

export default function TestingPage() {
  useEffect(() => {
    const echo = getEcho();

    if (!echo) {
      return;
    }

    echo.channel("message-send").listen("SendMessage", (event: unknown) => {
      console.log("🔥 Received:", event);
    });

    return () => {
      echo.leave("message-send");
    };
  }, []);

  return <div>Listening for broadcasts...</div>;
}
