// constants/priorities.ts
export const TASK_PRIORITIES = [
  {
    value: "LOW",
    label: "Low",
    color: "bg-green-100 text-green-700 border-green-300 hover:bg-green-200",
  },
  {
    value: "MEDIUM",
    label: "Medium",
    color:
      "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200",
  },
  {
    value: "HIGH",
    label: "High",
    color:
      "bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200",
  },
  {
    value: "URGENT",
    label: "Urgent",
    color: "bg-red-100 text-red-700 border-red-300 hover:bg-red-200",
  },
] as const;

export type TaskPriority = (typeof TASK_PRIORITIES)[number]["value"];
