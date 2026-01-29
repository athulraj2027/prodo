"use client";
import React, { useEffect, useState } from "react";

import { TASK_STATUS } from "@/lib/constants/task-status";
import { Task } from "@/types/task";
import KanbanColumn from "../kanban/kanbanColumn";
import { DatePickerDemo } from "../user/DatePicker";
import { toast } from "sonner";
import { fetchTasksfromBackend } from "@/actions/tasks";
import { useTasksStore } from "@/store/tasksStore";
import { useAuth } from "@clerk/nextjs";
import { Badge } from "../ui/badge";
import { formatTime } from "@/lib/formatTime";
// Sample tasks

// Main Kanban Board
const TaskKanbanBoard = () => {
  const { getToken } = useAuth();
  const tasks = useTasksStore((state) => state.tasks);
  const setTasks = useTasksStore((state) => state.setTasks);
  const [loading, setLoading] = useState(false);
  const [timeSpentToday, setTimeSpentToday] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const data = await fetchTasksfromBackend(token as string);
        setTasks(data.tasks);
        setTimeSpentToday(data.timeSpentToday);
      } catch (error) {
        console.log("Error in fetching tasks : ", error);
        toast.error("Error in fetching tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [setTasks, getToken]);

  const handleDrop = (taskId: string, newStatus: keyof typeof TASK_STATUS) => {
    // setTasks((prevTasks) =>
    //   prevTasks.map((task) =>
    //     task._id === taskId ? { ...task, status: newStatus } : task
    //   )
    // );
  };

  const getTasksByStatus = (status: keyof typeof TASK_STATUS) => {
    return tasks.filter((task) => task.status === status);
  };

  if (loading)
    return (
      <div className="w-full min-h-screen bg-white dark:bg-black p-6 flex justify-center items-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  return (
    <div className="w-full min-h-screen bg-white dark:bg-black p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Task Board</h1>
      </div>
      <DatePickerDemo />
      <br />
      <Badge className="bg-linear-to-bl from-indigo-500 via-purple-500 to-pink-500 text-white text-sm mb-3">
        You worked for {formatTime(timeSpentToday)} today
      </Badge>

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
