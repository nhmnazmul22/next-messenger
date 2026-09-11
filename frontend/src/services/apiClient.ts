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

export const apiClient = async <T extends object>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponseType<T>> => {
  const response = await fetch(resolveUrl(url), {
    ...options,
    credentials: "include",
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
