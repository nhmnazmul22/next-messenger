export const convertFileToBase64 = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  return Buffer.from(buffer).toString("base64");
};
