"use server";
import { ApiResponseType } from "@/services/apiClient";
import { loginUser, registerUser } from "@/services/auth";
import { LoginType, RegisterType } from "@/types/auth";
import { handleError } from "@/utils/error";
import { convertFileToBase64 } from "@/utils/file";
import { formValidation } from "@/utils/validation";

export const registerAction = async (
  state: ApiResponseType<RegisterType> | null,
  formData: FormData,
): Promise<ApiResponseType<RegisterType> | null> => {
  const avatarFile = formData.get("avatar");
  let avatar: string | undefined;

  if (avatarFile && avatarFile instanceof File && avatarFile.size > 0) {
    avatar = await convertFileToBase64(avatarFile);
  }

  const data: RegisterType = {
    name: formData.get("fullname") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    avatarUrl: avatar,
  };

  const validationResult = formValidation(data, ["name", "email", "password"]);

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.message ?? "Validation failed",
    };
  }

  try {
    const response = await registerUser<RegisterType>(data);
    return {
      success: response.success ?? true,
      message: response.message ?? "Registration successful",
      data: response.data,
    };
  } catch (error) {
    console.error("error", error);
    return handleError(error);
  }
};

export const loginAction = async (
  state: ApiResponseType<LoginType> | null,
  formData: FormData,
): Promise<ApiResponseType<LoginType> | null> => {
  const data: LoginType = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validationResult = formValidation(data, ["email", "password"]);

  if (!validationResult.success) {
    return {
      success: false,
      message: validationResult.message ?? "Validation failed",
    };
  }

  try {
    const response = await loginUser<LoginType>(data);
    return {
      success: response.success ?? true,
      message: response?.message ?? "Login successful",
      data: response.data,
    };
  } catch (error) {
    console.error("error", error);
    return handleError(error);
  }
};
