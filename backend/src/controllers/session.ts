import session from "../models/session.js";
import task from "../models/task.js";

const stopSession = async (req: any, res: any) => {
  const userId = req.auth().userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const { taskId, duration } = req.body;

  if (!taskId || !duration || duration < 1) {
    return res.status(400).json({ message: "Invalid session data" });
  }

  try {
    const endedAt = new Date();
    const startedAt = new Date(endedAt.getTime() - duration * 1000);

    const sessionTask = await task.findOne({ _id: taskId, userId });
    if (!sessionTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    await session.create({
      userId,
      taskId,
      startedAt,
      endedAt,
      duration,
    });

    sessionTask.totalTimeSpent += duration;

    if (sessionTask.status === "TODO") {
      sessionTask.status = "IN_PROGRESS";
    }

    await sessionTask.save();

    return res.status(200).json({
      success: true,
      duration,
      totalTimeSpent: sessionTask.totalTimeSpent,
    });
  } catch (error) {}
};

export default { stopSession };
