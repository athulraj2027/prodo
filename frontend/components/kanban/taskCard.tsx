"use client";
import React, { useState } from "react";
import { Clock, CheckCircle2, Circle, ChevronDown } from "lucide-react";
import PriorityBadge from "../kanban/priorityBadge";
import TagBadge from "../kanban/tagBadge";
import { Task } from "@/types/task";
import { formatTime } from "@/lib/formatTime";

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

export default TaskCard;
