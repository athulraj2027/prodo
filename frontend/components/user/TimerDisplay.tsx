"use client";

import { useTimerStore } from "@/store/timerStore";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { StopCircle, Timer, GripVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { stopSessionAction } from "@/actions/session";
import { toast } from "sonner";

export default function TimerDisplay() {
  const { elapsed, isRunning, taskId, taskName } = useTimerStore();
  const stop = useTimerStore((state) => state.stop);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setPulse((prev) => !prev);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const syncStopSession = async (taskId: string, duration: number) => {
    try {
      await stopSessionAction({
        taskId,
        duration,
        endedAt: new Date(),
      });

      toast.success("Session synced", { id: "stop" });
    } catch (err) {
      console.error(err);

      toast.error("Will sync when online", { id: "stop" });

      // OPTIONAL: queue retry
    }
  };

  const stopSession = (taskId: string | null) => {
    if (!taskId) return;

    // 1️⃣ Stop UI instantly
    const duration = stop();

    toast.loading("Stopping session...", { id: "stop" });

    // 2️⃣ Backend sync async
    syncStopSession(taskId, duration);
  };

  // Update document title with timer
  useEffect(() => {
    if (isRunning) {
      document.title = `${formatTime(elapsed)} | prodo.`;
    } else {
      document.title = "prodo.";
    }
  }, [elapsed, isRunning]);

  // Blinking red dot favicon
  useEffect(() => {
    let blinkInterval: ReturnType<typeof setInterval> | null = null;
    const originalFavicon = document
      .querySelector("link[rel*='icon']")
      ?.getAttribute("href");

    const drawDot = (color: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, 64, 64);

      // Draw circle
      ctx.beginPath();
      ctx.arc(32, 32, 28, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      // Update all favicon links
      const links = document.querySelectorAll("link[rel*='icon']");
      links.forEach((link) => {
        (link as HTMLLinkElement).href = canvas.toDataURL("image/png");
      });
    };

    if (isRunning) {
      let visible = true;

      // Start blinking
      blinkInterval = setInterval(() => {
        visible = !visible;
        drawDot(visible ? "#ef4444" : "transparent");
      }, 500);
    } else {
      // Restore original favicon when stopped
      if (originalFavicon) {
        const links = document.querySelectorAll("link[rel*='icon']");
        links.forEach((link) => {
          (link as HTMLLinkElement).href = originalFavicon;
        });
      }
    }

    return () => {
      if (blinkInterval) {
        clearInterval(blinkInterval);
      }
      // Restore original favicon on unmount
      if (originalFavicon && !isRunning) {
        const links = document.querySelectorAll("link[rel*='icon']");
        links.forEach((link) => {
          (link as HTMLLinkElement).href = originalFavicon;
        });
      }
    };
  }, [isRunning]);

  return (
    <AnimatePresence>
      {isRunning && (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.1}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="fixed bottom-6 right-6 z-9999 cursor-grab active:cursor-grabbing"
        >
          {/* Main card - matching TaskCard styling exactly */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-lg border p-4 cursor-grab active:cursor-grabbing transition-all duration-300 ease-out hover:shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 min-w-65 relative overflow-hidden"
          >
            {/* Animated background glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-linear-to-br from-green-500/20 via-transparent to-blue-500/20 pointer-events-none"
            />

            {/* Floating particles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-30, -80],
                  x: [(i - 1.5) * 20, (i - 1.5) * 30],
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
                className="absolute bottom-20 left-1/2 w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full pointer-events-none"
              />
            ))}

            {/* Content */}
            <div className="relative z-10">
              {/* Drag handle header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Timer className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </motion.div>
                </div>
                <motion.span
                  animate={{
                    scale: pulse ? 1.05 : 1,
                  }}
                  className="px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                >
                  Active
                </motion.span>
              </div>

              {/* Task name - matching TaskCard header */}
              <h3 className="font-semibold text-sm mb-3 truncate">
                {taskName}
              </h3>

              {/* Timer display with background glow */}
              <div className="relative mb-4">
                {/* Glow effect behind numbers */}
                <motion.div
                  animate={{
                    opacity: pulse ? 0.3 : 0.1,
                    scale: pulse ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-xl rounded-lg"
                />

                {/* Timer numbers */}
                <div className="flex items-center justify-center gap-1 relative">
                  {/* Hours */}
                  <motion.div
                    key={`hours-${hours}`}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl font-bold font-mono"
                  >
                    {String(hours).padStart(2, "0")}
                  </motion.div>
                  <motion.span
                    animate={{ opacity: pulse ? 1 : 0.3 }}
                    className="text-3xl font-bold text-gray-400"
                  >
                    :
                  </motion.span>

                  {/* Minutes */}
                  <motion.div
                    key={`minutes-${minutes}`}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl font-bold font-mono"
                  >
                    {String(minutes).padStart(2, "0")}
                  </motion.div>
                  <motion.span
                    animate={{ opacity: pulse ? 1 : 0.3 }}
                    className="text-3xl font-bold text-gray-400"
                  >
                    :
                  </motion.span>

                  {/* Seconds */}
                  <motion.div
                    key={`seconds-${seconds}`}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl font-bold font-mono"
                  >
                    {String(seconds).padStart(2, "0")}
                  </motion.div>
                </div>
              </div>
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => stopSession(taskId)}
                  variant="destructive"
                  className="w-full transition-all duration-300 group text-white"
                  size="sm"
                >
                  <StopCircle className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                  Stop Session
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
