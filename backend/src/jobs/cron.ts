import cron from "node-cron";
import updateTaskStatus from "./update.task.status.js";

export const startCronJobs = () => {
  // Runs every day at 12:00 AM (server time)
  cron.schedule("0 0 * * *", async () => {
    console.log("🕛 Running daily task status update...");
    try {
      await updateTaskStatus();
    } catch (err) {
      console.error("❌ Cron job failed:", err);
    }
  });
};
