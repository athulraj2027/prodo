import { TaskPriority } from "@/types/task";

const PriorityBadge = ({ priority }: { priority: TaskPriority }) => {
  const colors = {
    HIGH: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    MEDIUM:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    LOW: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[priority]}`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;
