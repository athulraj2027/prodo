"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  TrendingUp,
  Calendar,
  Trophy,
  Activity,
  Zap,
  Loader2,
} from "lucide-react";
// import { DatePickerDemo } from "@/components/user/DatePicker";
import { useAuth } from "@clerk/nextjs";
import { fetchAnalytics } from "@/actions/analytics";
import { toast } from "sonner";
import WeeklyTaskBreakdown from "@/components/analytics/WeeklyTaskBreakdown";

type AnalyticsResponse = {
  summary: {
    todaySeconds: number;
    weekSeconds: number;
    longestSessionSeconds: number | null;
    topTask: {
      taskId: string;
      taskName: string;
      totalSeconds: number;
    } | null;
  };
  todaySessions: {
    sessionId: string;
    taskId: string;
    taskName: string;
    startedAt: string;
    endedAt: string;
    durationSeconds: number;
  }[];
  weeklyTaskBreakdown: {
    date: string;
    tasks: {
      taskId: string;
      taskName: string;
      seconds: number;
    }[];
  }[];
};

export default function AnalyticsPage() {
  const { getToken } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const token = await getToken();

        if (!token) {
          throw new Error("No auth token");
        }

        const data = await fetchAnalytics(token);
        setAnalytics(data);
      } catch (error) {
        console.error("Analytics fetch error:", error);
        toast.error("Failed to fetch analytics. Please try again");
      } finally {
        setLoading(false);
      }
    };

    getAnalytics();
  }, [getToken]);
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  const formatTime12hr = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading || !analytics) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  const maxDailySeconds = Math.max(
    ...analytics!.weeklyTaskBreakdown.map((day) =>
      day.tasks.reduce((sum, task) => sum + task.seconds, 0),
    ),
  );

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your productivity and focus time
          </p>
        </div>
        {/* <DatePickerDemo /> */}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Today's Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-6 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
              TODAY
            </span>
          </div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">
            {formatTime(analytics!.summary.todaySeconds)}
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Total focus time
          </p>
        </motion.div>

        {/* Week's Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-linear-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-6 rounded-lg border border-green-200 dark:border-green-800"
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">
              THIS WEEK
            </span>
          </div>
          <div className="text-3xl font-bold text-green-900 dark:text-green-100 mb-1">
            {formatTime(analytics!.summary.weekSeconds)}
          </div>
          <p className="text-sm text-green-700 dark:text-green-300">
            Weekly total
          </p>
        </motion.div>

        {/* Longest Session */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-6 rounded-lg border border-purple-200 dark:border-purple-800"
        >
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
              LONGEST
            </span>
          </div>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-1">
            {analytics!.summary.longestSessionSeconds
              ? formatTime(analytics!.summary.longestSessionSeconds)
              : "N/A"}
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            Best session
          </p>
        </motion.div>

        {/* Top Task */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 p-6 rounded-lg border border-orange-200 dark:border-orange-800"
        >
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span className="text-xs font-medium text-orange-600 dark:text-orange-400">
              TOP TASK
            </span>
          </div>
          <div className="text-3xl font-bold text-orange-900 dark:text-orange-100 mb-1">
            {analytics!.summary.topTask
              ? formatTime(analytics!.summary.topTask.totalSeconds)
              : "N/A"}
          </div>
          <p className="text-sm text-orange-700 dark:text-orange-300 truncate">
            {analytics!.summary.topTask?.taskName || "No tasks yet"}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 overflow-y-scroll "
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold">Sessions Today</h2>
          </div>

          <div className="space-y-3">
            {analytics!.todaySessions.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No sessions today yet
              </p>
            ) : (
              analytics!.todaySessions.map((session, index) => (
                <motion.div
                  key={session.sessionId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">
                      {session.taskName}
                    </h3>
                    <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                      {formatTime(session.durationSeconds)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>
                      {formatTime12hr(session.startedAt)} -{" "}
                      {formatTime12hr(session.endedAt)}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Weekly Overview Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-bold">Weekly Overview</h2>
          </div>

          {/* Bar Chart */}
          {/* Bar Chart */}
          <div className="relative h-64 overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-between gap-2 px-2">
              {analytics!.weeklyTaskBreakdown.map((day, dayIndex) => {
                const BAR_MAX_HEIGHT = 256;

                const totalSeconds = day.tasks.reduce(
                  (sum, task) => sum + task.seconds,
                  0,
                );

                const safeMax = Math.max(maxDailySeconds, 1);
                const barHeight = (totalSeconds / safeMax) * BAR_MAX_HEIGHT;

                const taskColors = [
                  "bg-blue-500",
                  "bg-purple-500",
                  "bg-pink-500",
                  "bg-orange-500",
                  "bg-green-500",
                  "bg-yellow-500",
                  "bg-red-500",
                  "bg-indigo-500",
                  "bg-cyan-500",
                ];

                return (
                  <div
                    key={day.date}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    {/* Stacked Bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: barHeight }}
                      transition={{
                        delay: 0.7 + dayIndex * 0.1,
                        duration: 0.5,
                      }}
                      className="w-full flex flex-col justify-end rounded-t-lg overflow-hidden"
                    >
                      {day.tasks.map((task, taskIndex) => {
                        const taskHeight =
                          totalSeconds === 0
                            ? 0
                            : (task.seconds / totalSeconds) * barHeight;

                        return (
                          <motion.div
                            key={task.taskId}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              delay: 0.8 + dayIndex * 0.1 + taskIndex * 0.05,
                            }}
                            className={`${
                              taskColors[taskIndex % taskColors.length]
                            } relative group`}
                            style={{ height: taskHeight }}
                          >
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                              {task.taskName}: {formatTime(task.seconds)}
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>

                    {/* Date */}
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {formatDate(day.date)}
                    </div>

                    {/* Total */}
                    <div className="text-xs font-mono font-bold text-gray-900 dark:text-gray-100">
                      {formatTime(totalSeconds)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
              Tasks
            </h3>

            <div className="flex flex-wrap gap-3">
              {(() => {
                const uniqueTasks = new Map<string, string>();

                analytics!.weeklyTaskBreakdown.forEach((day) => {
                  day.tasks.forEach((task) => {
                    if (!uniqueTasks.has(task.taskId)) {
                      uniqueTasks.set(task.taskId, task.taskName);
                    }
                  });
                });

                const taskColors = [
                  "bg-blue-500",
                  "bg-purple-500",
                  "bg-pink-500",
                  "bg-orange-500",
                  "bg-green-500",
                  "bg-yellow-500",
                  "bg-red-500",
                  "bg-indigo-500",
                  "bg-cyan-500",
                ];

                return Array.from(uniqueTasks.entries()).map(
                  ([taskId, taskName], index) => (
                    <div
                      key={taskId}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className={`w-3 h-3 rounded-sm ${
                          taskColors[index % taskColors.length]
                        }`}
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {taskName}
                      </span>
                    </div>
                  ),
                );
              })()}
            </div>
          </div>
        </motion.div>
      </div>

      <WeeklyTaskBreakdown
        weeklyTaskBreakdown={analytics.weeklyTaskBreakdown}
      />
    </div>
  );
}
