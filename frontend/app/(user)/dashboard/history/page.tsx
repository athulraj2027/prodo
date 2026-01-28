"use client";
import { Task } from "@/types/task";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, CheckCircle2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import PriorityBadge from "@/components/kanban/priorityBadge";
import TagBadge from "@/components/kanban/tagBadge";
import { formatTime } from "@/lib/formatTime";
import { TASK_PRIORITIES } from "@/lib/constants/task_priority";
import { TASK_TAG_LIST } from "@/lib/constants/task_tag";

const API = process.env.NEXT_PUBLIC_BACKEND_URL;

type SortOption = "name" | "date" | "priority" | "timeSpent";
type SortOrder = "asc" | "desc";

export default function HistoryPage() {
  const { getToken } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/task/completed`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          toast.error("Failed to fetch tasks. Please try again");
          return;
        }
        const data = await res.json();
        setTasks(data.tasks);
        setFilteredTasks(data.tasks);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, [getToken]);

  useEffect(() => {
    let result = [...tasks];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (task) =>
          task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Priority filter
    if (selectedPriority !== "all") {
      result = result.filter((task) => task.priority === selectedPriority);
    }

    // Tag filter
    if (selectedTag !== "all") {
      result = result.filter((task) => task.tag === selectedTag);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "date":
          comparison =
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case "priority":
          const priorityOrder = { URGENT: 3, HIGH: 2, MEDIUM: 1, LOW: 0 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case "timeSpent":
          comparison = (a.totalTimeSpent || 0) - (b.totalTimeSpent || 0);
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredTasks(result);
  }, [tasks, searchQuery, selectedPriority, selectedTag, sortBy, sortOrder]);

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(option);
      setSortOrder("desc");
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Completed Tasks</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}{" "}
          completed
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-3">
          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Priorities</option>
            {TASK_PRIORITIES.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>

          {/* Tag Filter */}
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Tags</option>
            {TASK_TAG_LIST.map((tag) => (
              <option key={tag.value} value={tag.value}>
                {tag.label}
              </option>
            ))}
          </select>

          {/* Sort Options */}
          <div className="flex gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort("date")}
              className={
                sortBy === "date" ? "bg-gray-100 dark:bg-gray-800" : ""
              }
            >
              Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort("name")}
              className={
                sortBy === "name" ? "bg-gray-100 dark:bg-gray-800" : ""
              }
            >
              Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort("timeSpent")}
              className={
                sortBy === "timeSpent" ? "bg-gray-100 dark:bg-gray-800" : ""
              }
            >
              Time {sortBy === "timeSpent" && (sortOrder === "asc" ? "↑" : "↓")}
            </Button>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Task
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Tag
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Checkpoints
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Time Spent
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence>
                {filteredTasks.map((task, index) => (
                  <motion.tr
                    key={task._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-semibold text-sm">{task.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                          {task.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <PriorityBadge priority={task.priority} />
                    </td>
                    <td className="px-4 py-4">
                      <TagBadge tag={task.tag} />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm">
                          {task.checkpoints.filter((c) => c.completed).length}/
                          {task.checkpoints.length}
                        </div>
                        <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{
                              width: `${
                                (task.checkpoints.filter((c) => c.completed)
                                  .length /
                                  task.checkpoints.length) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-3 h-3" />
                        {formatTime(task.totalTimeSpent || 0)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(task.updatedAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setExpandedTask(
                            expandedTask === task._id ? null : task._id,
                          )
                        }
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedTask === task._id ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {expandedTask && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
            >
              {filteredTasks
                .filter((t) => t._id === expandedTask)
                .map((task) => (
                  <div key={task._id} className="p-6 space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {task.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Checkpoints</h4>
                      <div className="space-y-2">
                        {task.checkpoints.map((checkpoint) => (
                          <div
                            key={checkpoint._id}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="line-through text-gray-500">
                              {checkpoint.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No completed tasks found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
