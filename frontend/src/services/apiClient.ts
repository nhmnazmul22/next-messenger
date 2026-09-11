import { ApiError } from "@/helpers/ErrorHelper";
import { parseJson } from "@/utils/http";

const resolveUrl = (url: string) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${baseUrl}${url}`;
};

export const apiClient = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(resolveUrl(url), options);

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
