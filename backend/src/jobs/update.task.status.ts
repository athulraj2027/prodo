import Task from "../models/task";

export default async function updateTaskStatus() {
  const today = new Date();

  await Task.updateMany(
    {
      status: { $ne: "COMPLETED" },
      due_date: { $lt: today },
    },
    {
      $set: { status: "BACKLOG" },
    }
  );

  console.log("All the tasks for yesterday has been updated to backlog");
  return;
}
