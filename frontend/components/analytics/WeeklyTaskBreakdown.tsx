"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

type WeeklyTaskBreakdownProps = {
  weeklyTaskBreakdown: {
    date: string;
    tasks: {
      taskId: string;
      taskName: string;
      seconds: number;
    }[];
  }[];
};

const taskColors = [
  "#3B82F6", // blue
  "#8B5CF6", // purple
  "#EC4899", // pink
  "#F97316", // orange
  "#22C55E", // green
  "#EAB308", // yellow
  "#EF4444", // red
  "#6366F1", // indigo
  "#06B6D4", // cyan
];

export default function WeeklyTaskBreakdown({
  weeklyTaskBreakdown,
}: WeeklyTaskBreakdownProps) {
  const donutSlices = useMemo(() => {
    const map = new Map<string, { name: string; seconds: number }>();

    weeklyTaskBreakdown.forEach((day) => {
      day.tasks.forEach((task) => {
        if (!map.has(task.taskId)) {
          map.set(task.taskId, {
            name: task.taskName,
            seconds: 0,
          });
        }
        map.get(task.taskId)!.seconds += task.seconds;
      });
    });

    const tasks = Array.from(map.entries()).map(([taskId, data]) => ({
      taskId,
      taskName: data.name,
      seconds: data.seconds,
    }));

    const totalSeconds = tasks.reduce((sum, t) => sum + t.seconds, 0);
    if (totalSeconds === 0) return [];

    let offset = 0;

    return tasks.map((task) => {
      const percent = task.seconds / totalSeconds;

      const slice = {
        ...task,
        dashArray: `${percent * 100} ${100 - percent * 100}`,
        dashOffset: 100 - offset * 100,
      };

      offset += percent;
      return slice;
    });
  }, [weeklyTaskBreakdown]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-xl font-bold mb-6">Weekly Task Breakdown</h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        {donutSlices.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400 py-12">
            No task data for this week yet
          </div>
        ) : (
          <svg viewBox="0 0 36 36" className="w-64 h-64 -rotate-90">
            {donutSlices.map((task, index) => (
              <motion.circle
                key={task.taskId}
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke={taskColors[index % taskColors.length]}
                strokeWidth="3.5"
                strokeDasharray={task.dashArray}
                strokeDashoffset={task.dashOffset}
                initial={{ strokeDasharray: "0 100" }}
                animate={{ strokeDasharray: task.dashArray }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="cursor-pointer"
              >
                <title>
                  {task.taskName}: {formatTime(task.seconds)}
                </title>
              </motion.circle>
            ))}
          </svg>
        )}

        {/* Legend */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {donutSlices.map((task, index) => (
            <div key={task.taskId} className="flex items-center gap-3 text-sm">
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: taskColors[index % taskColors.length],
                }}
              />
              <span className="text-gray-700 dark:text-gray-300 truncate">
                {task.taskName}
              </span>
              <span className="ml-auto font-mono text-gray-500">
                {formatTime(task.seconds)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
