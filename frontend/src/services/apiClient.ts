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
    console.log("Response not ok:", response);
    throw new Error(`${response.statusText}`);
  }
  return response.json();
};
