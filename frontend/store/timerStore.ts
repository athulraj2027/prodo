import { create } from "zustand";

interface TimerStore {
  taskId: string | null;
  sessionId: string | null;
  timerStart: (taskId: string) => void;
  timerStop: (taskId: string) => void;
}

export const useTimerStore = create<TimerStore>((set, get) => ({
  taskId: null,
  sessionId: null,
  timerStart: (taskId: string) => {
    const runningTask = get().taskId;

    // Block parallel sessions
    if (runningTask && runningTask !== taskId) {
      console.warn("Stop current timer before starting another");
      return;
    }

    set({
      taskId,
      sessionId: crypto.randomUUID(),
    });
  },

  timerStop: () => {
    set({
      taskId: null,
      sessionId: null,
    });
  },
}));
