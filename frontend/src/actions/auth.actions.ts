"use server";
import { registerUser } from "@/services/auth";
import { RegisterUserType } from "@/types/auth";
import { formValidation } from "@/utils/validation";

export type RegisterActionResult<T extends object> = {
  success: boolean;
  message: string;
  data?: T;
};

export const registerAction = async (
  state: RegisterActionResult<RegisterUserType>,
  formData: FormData,
): Promise<RegisterActionResult<RegisterUserType>> => {
  const data: RegisterUserType = {
    fullname: formData.get("fullname") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    avatar: formData.get("avatar") as string | undefined,
  };

  const validationResult = formValidation(data, [
    "fullname",
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
