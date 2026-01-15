import { Task } from "@/types/task";
import { create } from "zustand";

interface ActiveTaskStore {
  task: Task | null;
  setActiveTask: (task: Task | null) => void;
}
export const useActiveTaskStore = create<ActiveTaskStore>((set) => ({
  task: null,
  setActiveTask: (task) => set({ task }),
}));
