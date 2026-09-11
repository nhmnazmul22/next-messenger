import { ApiError } from "@/helpers/ErrorHelper";
import { parseJson } from "@/helpers/http";

export type ApiResponseType<T extends object> = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: T;
};

const resolveUrl = (url: string) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${baseUrl}${url}`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

export const apiClient = async <T extends object>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponseType<T>> => {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  if ((options.method ?? "GET") !== "GET") {
    const xsrfToken = getCookie("XSRF-TOKEN");
    if (xsrfToken) {
      headers.set("X-XSRF-TOKEN", xsrfToken);
    }
  }

  const response = await fetch(resolveUrl(url), {
    ...options,
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    const body = await parseJson(response);
    throw new ApiError(
      body?.message || "An error occurred",
      response.status,
      body?.errors || null,
    );
  }

  return parseJson(response);
};
