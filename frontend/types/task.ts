export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";
export type TaskCheckpoint = {
  id: string;
  text: string;
  completed: boolean;
};
export type Task = {
  id: string;
  name: string;
  description: string;
  status: "BACKLOG" | "TODO" | "IN_PROGRESS" | "COMPLETED";
  checkpoints: TaskCheckpoint[];
  timeSpent: number; // in seconds
  priority: TaskPriority;
  tag: string;
};
