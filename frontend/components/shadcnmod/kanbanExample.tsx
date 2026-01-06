"use client";
import React, { useState } from "react";
import {
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  ChevronDown,
  Play,
  Pause,
} from "lucide-react";

// Types
type TaskPriority = "HIGH" | "MEDIUM" | "LOW";
type TaskCheckpoint = {
  id: string;
  text: string;
  completed: boolean;
};
type Task = {
  id: string;
  name: string;
  description: string;
  status: "BACKLOG" | "TODO" | "IN_PROGRESS" | "COMPLETED";
  checkpoints: TaskCheckpoint[];
  timeSpent: number; // in seconds
  priority: TaskPriority;
  tag: string;
};

// Mock TASK_STATUS
const TASK_STATUS = {
  BACKLOG: { id: "BACKLOG", name: "Backlog", color: "#64748b" },
  TODO: { id: "TODO", name: "To Do", color: "#f59e0b" },
  IN_PROGRESS: { id: "IN_PROGRESS", name: "In Progress", color: "#3b82f6" },
  COMPLETED: { id: "COMPLETED", name: "Completed", color: "#10b981" },
};

// Sample tasks
const initialTasks: Task[] = [
  {
    id: "1",
    name: "Implement Binary Search Tree",
    description:
      "Create a balanced BST with insert, delete, and search operations",
    status: "IN_PROGRESS",
    checkpoints: [
      { id: "c1", text: "Create Node class", completed: true },
      { id: "c2", text: "Implement insert method", completed: true },
      { id: "c3", text: "Implement search method", completed: false },
      { id: "c4", text: "Write unit tests", completed: false },
    ],
    timeSpent: 3600,
    priority: "HIGH",
    tag: "DSA",
  },
  {
    id: "2",
    name: "Build User Authentication",
    description: "Implement JWT-based authentication with refresh tokens",
    status: "TODO",
    checkpoints: [
      { id: "c5", text: "Set up JWT library", completed: false },
      { id: "c6", text: "Create login endpoint", completed: false },
      { id: "c7", text: "Add refresh token logic", completed: false },
    ],
    timeSpent: 0,
    priority: "HIGH",
    tag: "Project",
  },
  {
    id: "3",
    name: "Learn React Server Components",
    description: "Study and practice RSC patterns in Next.js 14",
    status: "BACKLOG",
    checkpoints: [
      { id: "c8", text: "Read official docs", completed: false },
      { id: "c9", text: "Build demo app", completed: false },
    ],
    timeSpent: 1200,
    priority: "MEDIUM",
    tag: "Learning",
  },
  {
    id: "4",
    name: "Optimize Database Queries",
    description: "Add indexes and optimize slow queries",
    status: "COMPLETED",
    checkpoints: [
      { id: "c10", text: "Identify slow queries", completed: true },
      { id: "c11", text: "Add indexes", completed: true },
      { id: "c12", text: "Test performance", completed: true },
    ],
    timeSpent: 7200,
    priority: "HIGH",
    tag: "Project",
  },
  {
    id: "5",
    name: "Practice Dynamic Programming",
    description: "Solve 10 DP problems on LeetCode",
    status: "TODO",
    checkpoints: [
      { id: "c13", text: "Solve Fibonacci variations", completed: false },
      { id: "c14", text: "Solve knapsack problem", completed: false },
    ],
    timeSpent: 2400,
    priority: "MEDIUM",
    tag: "DSA",
  },
];

// Priority badge component
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

// Tag badge component
const TagBadge = ({ tag }: { tag: string }) => {
  const colors = {
    DSA: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Project: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Learning:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
        colors[tag] || "bg-gray-100 text-gray-700"
      }`}
    >
      {tag}
    </span>
  );
};

// Format time
const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

// Task Card Component
const TaskCard = ({
  task,
  onDragStart,
}: {
  task: Task;
  onDragStart: (id: string) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const completedCheckpoints = task.checkpoints.filter(
    (c) => c.completed
  ).length;
  const totalCheckpoints = task.checkpoints.length;
  const progress =
    totalCheckpoints > 0 ? (completedCheckpoints / totalCheckpoints) * 100 : 0;

  return (
    <div
      draggable
      onDragStart={() => onDragStart(task.id)}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sm flex-1">{task.name}</h3>
        <PriorityBadge priority={task.priority} />
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
        {task.description}
      </p>

      {/* Tags and Time */}
      <div className="flex items-center gap-2 mb-3">
        <TagBadge tag={task.tag} />
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="w-3 h-3" />
          <span>{formatTime(task.timeSpent)}</span>
        </div>
      </div>

      {/* Progress */}
      {totalCheckpoints > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>
              {completedCheckpoints}/{totalCheckpoints}
            </span>
          </div>
          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Checkpoints Toggle */}
      {totalCheckpoints > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <ChevronDown
            className={`w-3 h-3 transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          />
          <span>{expanded ? "Hide" : "Show"} checkpoints</span>
        </button>
      )}

      {/* Expanded Checkpoints */}
      {expanded && (
        <div className="mt-3 space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          {task.checkpoints.map((checkpoint) => (
            <div
              key={checkpoint.id}
              className="flex items-center gap-2 text-xs"
            >
              {checkpoint.completed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
              ) : (
                <Circle className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              )}
              <span
                className={
                  checkpoint.completed ? "line-through text-gray-500" : ""
                }
              >
                {checkpoint.text}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Kanban Column Component
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
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: statusConfig.color }}
        />
        <h2 className="font-semibold text-sm">{statusConfig.name}</h2>
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

// Main Kanban Board
const TaskKanbanBoard = () => {
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
