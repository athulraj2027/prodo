"use client";

import { useEffect } from "react";
import { useTimerStore } from "@/store/timerStore";

export default function TimerRunner() {
  const tick = useTimerStore((s) => s.tick);
  const restore = useTimerStore((s) => s.restore);

  useEffect(() => {
    restore();

    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [restore, tick]);

  return null; // invisible background worker
}
