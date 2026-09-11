"use server";
import { registerUser } from "@/services/auth";
import { RegisterUserType } from "@/types/auth";
import { convertFileToBase64 } from "@/utils/file";
import { formValidation } from "@/utils/validation";

export type RegisterActionResult<T extends object> = {
  success: boolean;
  message: string;
  data?: T;
};

export const registerAction = async (
  state: RegisterActionResult<RegisterUserType> | null,
  formData: FormData,
): Promise<RegisterActionResult<RegisterUserType> | null> => {
  const avatarFile = formData.get("avatar");
  let avatar: string | undefined;

  if (avatarFile && avatarFile instanceof File && avatarFile.size > 0) {
    avatar = await convertFileToBase64(avatarFile);
  }

  const data: RegisterUserType = {
    name: formData.get("fullname") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    avatarUrl: avatar,
  };

  const validationResult = formValidation(data, [
    "name",
    "email",
    "password",
  ]);

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
      data: response as RegisterUserType,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};
