"use server";
import { loginUser, registerUser } from "@/services/auth";
import { LoginType, RegisterType } from "@/types/auth";
import { handleError } from "@/utils/error";
import { convertFileToBase64 } from "@/utils/file";
import { formValidation } from "@/utils/validation";

export type ActionResult<T extends object> = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  data?: T;
};

export const registerAction = async (
  state: ActionResult<RegisterType> | null,
  formData: FormData,
): Promise<ActionResult<RegisterType> | null> => {
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
    const response = await registerUser(data);
    return {
      success: true,
      message: "Registration successful",
      data: response as RegisterType,
    };
  } catch (error) {
    console.error("error", error);
    return handleError(error);
  }
};

export const loginAction = async (
  state: ActionResult<LoginType> | null,
  formData: FormData,
): Promise<ActionResult<LoginType> | null> => {
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
    const response = await loginUser(data);
    return {
      success: true,
      message: "Login successful",
      data: response as LoginType,
    };
  } catch (error) {
    console.error("error", error);
    return handleError(error);
  }
};
