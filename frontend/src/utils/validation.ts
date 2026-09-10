export const formValidation = <T extends object>(
  data: T,
  requiredData: (keyof T)[],
) => {
  for (const key of requiredData) {
    if (!data[key]) {
      return {
        success: false,
        message: `${String(key)} is required`,
      };
    }
  }
  return { success: true };
};
