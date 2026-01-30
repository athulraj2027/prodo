import { FormDataProps } from "@/lib/validators";
import { TaskCheckpoint } from "@/types/task";
const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchTasksfromBackend = async () => {
  const res = await fetch(`${API}/task`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error in fetching the tasks");
  const data = await res.json();
  return data;
};

export const createTask = async (formData: FormDataProps) => {
  const payload = {
    ...formData,
    date: formData.date?.toISOString(),
  };

  const res = await fetch(`${API}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json();
};

export const dltTasksAction = async (taskId: string) => {
  const payload = { deleteTask: true };
  const res = await fetch(`${API}/task?taskId=${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json();
};

export const createCheckpointAction = async (
  taskId: string,
  checkpoint: string,
) => {
  const res = await fetch(`${API}/task?taskId=${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ checkpoint }),
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to create checkpoint");
  }

  return res.json();
};

export const updateCheckpointAction = async (
  taskId: string,
  changed: TaskCheckpoint[],
) => {
  console.log("changed : ", changed);
  const res = await fetch(`${API}/task?taskId=${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ checkpoints: changed }),
  });

  return res.json();
};
