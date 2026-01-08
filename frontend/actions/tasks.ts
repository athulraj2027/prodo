import { FormDataProps } from "@/lib/validators";
const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchTasksfromBackend = async () => {
  const res = await fetch(`${API}/task`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error in fetching the tasks");
  const data = await res.json();
  console.log(`data received : ${data}`);
  return data.tasks;
};

export const createTask = async (formData: FormDataProps, token: any) => {
  const payload = {
    ...formData,
    date: formData.date.toISOString(),
  };

  const res = await fetch(`${API}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json();
};
