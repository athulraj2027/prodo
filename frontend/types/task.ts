export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";
export type TaskCheckpoint = {
  _id: string;
  name: string;
  completed: boolean;
};
export type Task = {
  _id: string;
  name: string;
  description: string;
  status: "BACKLOG" | "TODO" | "IN_PROGRESS" | "COMPLETED";
  checkpoints: TaskCheckpoint[];
  timeSpent: number; // in seconds
  priority: TaskPriority;
  tag: string;
  due_date: Date;
};
