const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export const stopSessionAction = async (
  session: {
    taskId: string;
    duration: number;
    endedAt: Date;
  },
  token: string,
) => {
  const res = await fetch(`${API}/session/stop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(session),
  });
  if (!res.ok) throw new Error("Failed to mark session in the backend");

  return res.json();
};
