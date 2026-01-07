// constants/taskTags.ts
export const TASK_TAG = {
  PROJECT: {
    value: "PROJECT",
    label: "Project",
    color: "bg-slate-100 text-slate-700 border-slate-300",
    createBtn: false,
  },
  DSA: {
    value: "DSA",
    label: "DSA",
    color: "bg-amber-100 text-amber-700 border-amber-300",
    createBtn: true,
  },
  SIDE_PROJECT: {
    value: "SIDE_PROJECT",
    label: "Side Project",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    createBtn: false,
  },
  LEARNING: {
    value: "LEARNING",
    label: "Learning",
    color: "bg-emerald-100 text-emerald-700 border-emerald-300",
    createBtn: false,
  },
} as const;

export type TaskTag = (typeof TASK_TAG)[keyof typeof TASK_TAG]["value"];

export const TASK_TAG_LIST = Object.values(TASK_TAG);
