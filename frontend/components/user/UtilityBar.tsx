"use client";
import React, { useState, useEffect } from "react";
import {
  Play,
  Trash2,
  CheckCircle2,
  Circle,
  Calendar,
  StopCircle,
  PlusIcon,
  Clock,
  CheckCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useActiveTaskStore } from "@/store/activeTaskStore";
import { TASK_PRIORITIES } from "@/lib/constants/task_priority";
import { TASK_TAG_LIST } from "@/lib/constants/task_tag";
import { TASK_STATUS } from "@/lib/constants/task-status";
import DltTaskCard from "./DltTaskCard";
import { useAuth } from "@clerk/nextjs";
import {
  createCheckpointAction,
  dltTasksAction,
  updateCheckpointAction,
} from "@/actions/tasks";
import { toast } from "sonner";
import { useTasksStore } from "@/store/tasksStore";
import CheckpointForm from "./CheckpointForm";
import { useTimerStore } from "@/store/timerStore";

const UtilityBar = () => {
  const task = useActiveTaskStore((state) => state.task);
  const setTask = useActiveTaskStore((state) => state.setActiveTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const start = useTimerStore((state) => state.start);
  const isRunning = useTimerStore((state) => state.isRunning);
  // const [timeSpent, setTimeSpent] = useState(0);
  const [checkpoints, setCheckpoints] = useState(task?.checkpoints);
  const [dirtyMap, setDirtyMap] = useState<{ [key: string]: boolean }>({});
  const [isDirty, setIsDirty] = useState(false);
  const [dltModal, setDltModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkpointForm, setCheckpointForm] = useState(false);

  useEffect(() => {
    if (task?.checkpoints) {
      setCheckpoints(task.checkpoints);
      setDirtyMap({});
      setIsDirty(false);
    }
  }, [task]);

  const priority = TASK_PRIORITIES.find((p) => p.value === task?.priority);
  const tag = TASK_TAG_LIST.find((t) => t.value === task?.tag);
  const status = Object.values(TASK_STATUS).find((s) => s.id === task?.status);

  const { getToken } = useAuth();

  // useEffect(() => {
  //   let interval;
  //   if (isTimerRunning) {
  //     interval = setInterval(() => {
  //       setTimeSpent((prev) => prev + 1);
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval);
  // }, [isTimerRunning]);

  // const formatTime = (seconds) => {
  //   const hrs = Math.floor(seconds / 3600);
  //   const mins = Math.floor((seconds % 3600) / 60);
  //   const secs = seconds % 60;
  //   return `${hrs.toString().padStart(2, "0")}:${mins
  //     .toString()
  //     .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  // };

  // useEffect(() => {
  //   if (isTimerRunning) {
  //     document.title = `${formatTime(timeSpent)} | prodo.`;
  //   } else {
  //     document.title = "prodo.";
  //     // document.title.fontcolor = 'red'
  //   }
  // }, [timeSpent, isTimerRunning]);

  // useEffect(() => {
  //   let blinkInterval: any;

  //   const drawDot = (color: string) => {
  //     const canvas = document.createElement("canvas");
  //     canvas.width = 64;
  //     canvas.height = 64;

  //     const ctx = canvas.getContext("2d");
  //     if (!ctx) return;

  //     ctx.clearRect(0, 0, 64, 64);

  //     ctx.beginPath();
  //     ctx.arc(32, 32, 28, 0, Math.PI * 2);
  //     ctx.fillStyle = color;
  //     ctx.fill();

  //     let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;

  //     if (!link) {
  //       link = document.createElement("link");
  //       link.rel = "icon";
  //       document.head.appendChild(link);
  //     }

  //     link.href = canvas.toDataURL("image/png");
  //   };

  //   if (isTimerRunning) {
  //     let visible = true;

  //     blinkInterval = setInterval(() => {
  //       drawDot(visible ? "red" : "transparent");
  //       visible = !visible;
  //     }, 500); // blink speed
  //   } else {
  //     drawDot("black"); // stopped state
  //   }

  //   return () => clearInterval(blinkInterval);
  // }, [isTimerRunning]);

  const dltTask = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token || !task) return;
      await dltTasksAction(task._id as string, token);
      deleteTask(task);
      setTask(null);
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
      console.log("Errror : ", error);
    } finally {
      setDltModal(false);
      setLoading(false);
    }
  };

  const createCheckpoint = async (checkpoint: string) => {
    if (checkpoint.trim().length < 5) {
      toast.error("You need atleast 5 letters in checkpoint");
      return;
    }
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) return;
      const data = await createCheckpointAction(
        task?._id as string,
        token,
        checkpoint,
      );
      console.log(data);
      updateTask(data);
      setTask(data);
      toast.success("Checkpoint created successfully");
    } catch (error) {
      console.log("Error in creating checkpoint : ", error);
      toast.error("Failed to create checkpoint");
    } finally {
      setLoading(false);
    }
  };

  const toggleCheckpoint = (id: string) => {
    setCheckpoints(
      checkpoints?.map((cp) =>
        cp._id === id ? { ...cp, completed: !cp.completed } : cp,
      ),
    );

    setDirtyMap((prev) => ({ ...prev, [id]: true }));
    setIsDirty(true);
  };

  const saveCheckpoints = async () => {
    if (!isDirty) return;

    setLoading(true);
    const token = await getToken();
    const changed = checkpoints?.filter((cp) => dirtyMap[cp._id]);
    if (!changed || !task || !token) {
      console.log("No changed array found");
      return;
    }
    console.log("changed : ", changed);
    try {
      const data = await updateCheckpointAction(task._id, token, changed);
      updateTask(data.task);
      setDirtyMap({});
      setIsDirty(false);
      toast.success("Changes in checkpoints saved successfully");
    } catch (err) {
      toast.error("Syncing failed");
      console.log("ERror in syncing checkpoints : ", err);
    } finally {
      setLoading(false);
    }
  };

  const startSession = async (taskId: string, taskName: string) => {
    start(taskId, taskName);
  };

  const completedCount = checkpoints
    ? checkpoints?.filter((cp) => cp.completed).length
    : 0;

  const progress = checkpoints?.length
    ? (completedCount / checkpoints.length) * 100
    : 0;

  return (
    <div className="flex-[0.6] rounded-xl border border-gray-200 dark:border-gray-900 bg-white dark:bg-black p-6 space-y-6 overflow-y-auto max-h-screen">
      {/* Task Header */}
      <div className="bg-black dark:bg-none pt-2 pb-4 pl-5 rounded-md">
        <h1 className="text-white text-3xl font-extrabold">prodo.</h1>
      </div>

      {task ? (
        <div className="space-y-2 relative h-[80%]">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex-1">
                {task.name}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                onClick={() => setDltModal(true)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span
                className="px-2 py-1 rounded-md text-xs font-medium"
                style={{ backgroundColor: status?.color }}
              >
                {status?.name || task.status}
              </span>

              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${priority?.color}`}
              >
                {priority?.label}
              </span>

              <span
                className={`px-2 py-1 rounded-md text-xs font-medium ${
                  tag?.color || "bg-gray-100 text-gray-700"
                }`}
              >
                {tag?.label || task.tag}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Description
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {task.description}
            </p>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            {/* Total Time */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Total time spent :
                </span>
              </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Due Date:{" "}
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {new Date(task.due_date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Checkpoints */}
          <div className="space-y-2 max-h-80 border-2 border-gray-400 rounded-xl p-2">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Checkpoints
                </h3>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full size-5 p-3 shadow-2xl dark:bg-gray-900 
                       hover:scale-110 hover:rotate-12 hover:shadow-3xl
                       active:scale-95
                       transition-all duration-300 ease-out
                       animate-pulse-subtle
                       hover:animate-none"
                      onClick={() => setCheckpointForm(true)}
                    >
                      <PlusIcon />
                      <span className="sr-only">Add new checkpoint</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="px-2 py-1 text-xs">
                    Add new checkpoint
                  </TooltipContent>
                </Tooltip>
              </div>

              <span className="text-xs text-gray-500 dark:text-gray-400">
                {completedCount}/{checkpoints?.length}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Checkpoint List */}
            <div className="overflow-y-scroll slim-scroll h-40">
              {checkpoints
                ?.slice()
                .reverse()
                .map((checkpoint) => (
                  <button
                    key={checkpoint._id}
                    onClick={() => toggleCheckpoint(checkpoint._id)}
                    className="w-full flex items-start gap-3 p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors text-left group"
                  >
                    {checkpoint.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${
                        checkpoint.completed
                          ? "line-through text-gray-500 dark:text-gray-500"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {checkpoint.name}
                    </span>
                  </button>
                ))}
            </div>
          </div>
          <Button
            disabled={!isDirty || loading}
            onClick={saveCheckpoints}
            className={`px-4 py-2 rounded transition
  ${
    isDirty
      ? "bg-blue-600 text-white"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
          >
            Save Changes
          </Button>
          <br />
          {!isRunning && (
            <Button
              className="bg-blue-500 hover:bg-blue-800 text-white mt-3"
              onClick={() => startSession(task._id, task.name)}
            >
              Start session
            </Button>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-100 w-full">
          <p className="text-xs">Click on a task to continue</p>
        </div>
      )}

      {dltModal && (
        <DltTaskCard
          setDltModal={setDltModal}
          onDelete={dltTask}
          loading={loading}
        />
      )}
      {checkpointForm && (
        <CheckpointForm
          setCheckpointForm={setCheckpointForm}
          loading={loading}
          onSubmit={createCheckpoint}
        />
      )}
    </div>
  );
};

export default UtilityBar;
