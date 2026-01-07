"use client";
import React, { useState } from "react";

import { TASK_STATUS } from "@/lib/constants/task-status";
import { Task } from "@/types/task";
import TaskCard from "../kanban/taskCard";
import { Button } from "../ui/button";
import CreateTaskBtn from "./CreateTaskBtn";

const KanbanColumn = ({
  status,
  tasks,
  onDrop,
}: {
  status: keyof typeof TASK_STATUS;
  tasks: Task[];
  onDrop: (taskId: string, newStatus: keyof typeof TASK_STATUS) => void;
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const statusConfig = TASK_STATUS[status];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      onDrop(taskId, status);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col bg-gray-50   dark:bg-gray-900 rounded-lg p-4 min-h-125 transition-all ${
        isDragOver ? "ring-2 ring-blue-500 bg-blue-50 " : ""
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-3 h-3 rounded-full flex justify-between"
          style={{ backgroundColor: statusConfig.color }}
        />
        <h2 className="font-semibold text-sm">{statusConfig.name}</h2>
        {statusConfig.createBtn && <CreateTaskBtn />}
        <span className="ml-auto text-xs text-gray-500 bg-white dark:bg-gray-800 px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
            No tasks
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={(id) => {
                // Store task ID for drop handler
                const dragEvent = window.event as DragEvent;
                dragEvent?.dataTransfer?.setData("taskId", id);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
