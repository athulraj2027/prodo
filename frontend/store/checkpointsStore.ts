import { create } from "zustand";

type Store = {
  dirtyTasks: {
    [taskId: string]: any[];
  };
  setDirty: (taskId: string, cps: any[]) => void;
  clearDirty: (taskId: string) => void;
};

export const useCheckpointStore = create<Store>((set) => ({
  dirtyTasks: {},

  setDirty: (taskId, cps) =>
    set((state) => ({
      dirtyTasks: {
        ...state.dirtyTasks,
        [taskId]: cps,
      },
    })),

  clearDirty: (taskId) =>
    set((state) => {
      const copy = { ...state.dirtyTasks };
      delete copy[taskId];
      return { dirtyTasks: copy };
    }),
}));
