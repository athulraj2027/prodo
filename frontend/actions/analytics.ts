const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchAnalytics = async (token: string) => {
  const response = await fetch(`${API}/analytics`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch analytics");
  }

  const data = await response.json();
  return data;
};
