import Echo from "laravel-echo";
import Pusher from "pusher-js";

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

let echo: Echo<"reverb"> | null = null;

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
    });
  }

  return echo;
}

export default echo;
