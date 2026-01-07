export const fetchTasksfromBackend = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/task`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error in fetching the tasks");
  const data = await res.json();
  return data.tasks;
};
