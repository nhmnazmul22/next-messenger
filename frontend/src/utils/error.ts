import { ApiError } from "@/helpers/ErrorHelper";

export type ErrorType = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export const handleError = (error: unknown): ErrorType => {
  if (error instanceof ApiError) {
    return {
      success: false,
      message: error.message,
      errors: error.errors,
    };
  }
  return {
    success: false,
    message:
      error instanceof Error ? error.message : "An unexpected error occurred",
  };
};

export const processErrorMessage = (error: string | object): string => {
  if (typeof error === "object" && error !== null) {
    return Object.entries(error)
      .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
      .join(", ");
  }

  return typeof error === "string" ? error : "An unexpected error occurred";
};
