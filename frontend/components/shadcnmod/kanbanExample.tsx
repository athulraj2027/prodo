"use client";
import React, { useState } from "react";

import { TASK_STATUS } from "@/lib/constants/task-status";
import { Task } from "@/types/task";
import KanbanColumn from "../kanban/kanbanColumn";

// Sample tasks

// Main Kanban Board
const TaskKanbanBoard = ({ initialTasks }: { initialTasks: Task[] }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleDrop = (taskId: string, newStatus: keyof typeof TASK_STATUS) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const getTasksByStatus = (status: keyof typeof TASK_STATUS) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="w-full h-screen bg-white dark:bg-black p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Task Board</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Drag and drop tasks to update their status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.keys(TASK_STATUS).map((status) => (
          <KanbanColumn
            key={status}
            status={status as keyof typeof TASK_STATUS}
            tasks={getTasksByStatus(status as keyof typeof TASK_STATUS)}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskKanbanBoard;
