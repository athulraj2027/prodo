// routes/v1/internal/cron.routes.ts
import express from "express";
import updateTaskStatus from "../../jobs/update.task.status.js";

const router = express.Router();

router.post("/update-task-status", async (req, res) => {
  const secret = req.headers["x-cron-secret"];

  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ success: false });
  }

  await updateTaskStatus();
  res.json({ success: true });
});

export default router;
