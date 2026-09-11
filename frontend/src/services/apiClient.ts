import { ApiError } from "@/helpers/ErrorHelper";

const resolveUrl = (url: string) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `${baseUrl}${url}`;
};

export const apiClient = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(resolveUrl(url), options);

  if (!response.ok) {
    let message = "Something went wrong.";
    let errors: Record<string, string[]> | undefined;

    try {
      const body = await response.json();
      message = body.message || message;
      errors = body.errors;
    } catch {
      // response body is not JSON
    }

    throw new ApiError(message, response.status, errors);
  }

  return response.json();
};
