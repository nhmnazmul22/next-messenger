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

export const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
};

export const apiClient = async <T extends object>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponseType<T>> => {
  const initialOptions: RequestInit = {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") ?? "",
    },
  };

  const response = await fetch(resolveUrl(url), {
    ...initialOptions,
    ...options,
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
