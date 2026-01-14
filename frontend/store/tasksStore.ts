import { Task } from "@/types/task";
import { create } from "zustand";

interface TasksStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTask: (task: Task) => void;
  addTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
}

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      ),
    })),
  addTask: (task: Task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  deleteTask: (task: Task) =>
    set((state) => ({
      tasks: state.tasks.filter((el) => el._id != task._id),
    })),
}));
