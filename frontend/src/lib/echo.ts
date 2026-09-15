import { getCookie } from "@/services/apiClient";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

let echo: Echo<"reverb"> | null = null;
const apiEndPoint = `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000"}`;

export function getEcho() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!echo) {
    window.Pusher = Pusher;

    echo = new Echo({
      broadcaster: "reverb",
      key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
      wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
      wsPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT),
      wssPort: Number(process.env.NEXT_PUBLIC_REVERB_PORT),
      forceTLS: false,
      enabledTransports: ["ws", "wss"],
      authEndpoint: `${apiEndPoint}/api/broadcasting/auth`,

      authorizer: (channel) => {
        return {
          authorize: async (socketId, callback) => {
            try {
              const response = await fetch(
                `${apiEndPoint}/api/broadcasting/auth`,
                {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") ?? "",
                  },
                  body: JSON.stringify({
                    socket_id: socketId,
                    channel_name: channel.name,
                  }),
                },
              );

              if (!response.ok) {
                throw new Error(`Broadcast auth failed: ${response.status}`);
              }

              const data = await response.json();

              callback(null, data);
            } catch (error) {
              callback(
                error instanceof Error ? error : new Error(String(error)),
                null,
              );
            }
          },
        };
      },
    });
  }

  return echo;
}

export default echo;


