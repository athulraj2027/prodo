import { create } from "zustand";

type TimerState = {
  isRunning: boolean;
  taskId: string | null;
  taskName: string | null;
  startedAt: number | null;
  elapsed: number;

  start: (taskId: string, taskName: string) => void;
  stop: () => number;
  tick: () => void;
  restore: () => void;
};

export const useTimerStore = create<TimerState>((set, get) => ({
  isRunning: false,
  taskId: null,
  taskName: null,
  startedAt: null,
  elapsed: 0,

  start: (taskId, taskName) => {
    const startedAt = Date.now();

    localStorage.setItem(
      "prodo_active_session",
      JSON.stringify({ taskId, taskName, startedAt }),
    );

    set({
      isRunning: true,
      taskId,
      taskName,
      startedAt,
      elapsed: 0,
    });
  },

  stop: () => {
    const { startedAt } = get();
    if (!startedAt) return 0;

    const duration = Math.floor((Date.now() - startedAt) / 1000);

    localStorage.removeItem("prodo_active_session");

    set({
      isRunning: false,
      taskId: null,
      taskName: null,
      startedAt: null,
      elapsed: 0,
    });

    return duration;
  },

  tick: () => {
    const { startedAt, isRunning } = get();
    if (!startedAt || !isRunning) return;

    set({
      elapsed: Math.floor((Date.now() - startedAt) / 1000),
    });
  },

  restore: () => {
    const stored = localStorage.getItem("prodo_active_session");
    if (!stored) return;

    const { taskId, startedAt } = JSON.parse(stored);

    set({
      isRunning: true,
      taskId,
      startedAt,
      elapsed: Math.floor((Date.now() - startedAt) / 1000),
    });
  },
}));
