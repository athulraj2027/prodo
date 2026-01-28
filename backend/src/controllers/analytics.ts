import session from "../models/session.js";

const DELETED_TASK_ID = "DELETED_TASK";
const DELETED_TASK_NAME = "Deleted Task";

export const getAnalytics = async (req: any, res: any) => {
  try {
    const userId = req.auth().userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 6);
    startOfWeek.setHours(0, 0, 0, 0);

    const todaySessions = await session.aggregate([
      {
        $match: {
          userId,
          startedAt: { $gte: startOfToday },
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "taskId",
          foreignField: "_id",
          as: "task",
        },
      },
      {
        $unwind: {
          path: "$task",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          normalizedTaskId: {
            $cond: [
              { $eq: ["$task.isDeleted", true] },
              DELETED_TASK_ID,
              { $toString: "$task._id" },
            ],
          },
          normalizedTaskName: {
            $cond: [
              { $eq: ["$task.isDeleted", true] },
              DELETED_TASK_NAME,
              "$task.name",
            ],
          },
        },
      },
      { $sort: { startedAt: 1 } },
    ]);

    const todaySeconds = todaySessions.reduce((acc, s) => acc + s.duration, 0);

    const longestSessionSeconds =
      todaySessions.length > 0
        ? Math.max(...todaySessions.map((s) => s.duration))
        : null;

    const formattedTodaySessions = todaySessions.map((s) => ({
      sessionId: s._id.toString(),
      taskId: s.normalizedTaskId,
      taskName: s.normalizedTaskName,
      startedAt: s.startedAt.toISOString(),
      endedAt: s.endedAt ? s.endedAt.toISOString() : "",
      durationSeconds: s.duration,
    }));

    const weeklyAgg = await session.aggregate([
      {
        $match: {
          userId,
          startedAt: { $gte: startOfWeek },
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "taskId",
          foreignField: "_id",
          as: "task",
        },
      },
      {
        $unwind: {
          path: "$task",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$startedAt",
            },
          },
          normalizedTaskId: {
            $cond: [
              { $eq: ["$task.isDeleted", true] },
              DELETED_TASK_ID,
              { $toString: "$task._id" },
            ],
          },
          normalizedTaskName: {
            $cond: [
              { $eq: ["$task.isDeleted", true] },
              DELETED_TASK_NAME,
              "$task.name",
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            date: "$date",
            taskId: "$normalizedTaskId",
            taskName: "$normalizedTaskName",
          },
          seconds: { $sum: "$duration" },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          tasks: {
            $push: {
              taskId: "$_id.taskId",
              taskName: "$_id.taskName",
              seconds: "$seconds",
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);

      return {
        date: d.toISOString().split("T")[0],
        tasks: [],
      };
    });

    const weeklyTaskBreakdown = last7Days.map((day) => {
      const match = weeklyAgg.find((d) => d._id === day.date);
      return match ? { date: match._id, tasks: match.tasks } : day;
    });

    const weekSeconds = weeklyTaskBreakdown.reduce(
      (acc, day) =>
        acc + day.tasks.reduce((t: number, x: any) => t + x.seconds, 0),
      0,
    );

    const topTaskAgg = await session.aggregate([
      {
        $match: {
          userId,
          startedAt: { $gte: startOfWeek },
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "taskId",
          foreignField: "_id",
          as: "task",
        },
      },
      { $unwind: "$task" },
      {
        $match: {
          "task.isDeleted": { $ne: true },
        },
      },
      {
        $group: {
          _id: "$taskId",
          totalSeconds: { $sum: "$duration" },
        },
      },
      { $sort: { totalSeconds: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "_id",
          as: "task",
        },
      },
      { $unwind: "$task" },
    ]);

    const topTask =
      topTaskAgg.length > 0
        ? {
            taskId: topTaskAgg[0]._id.toString(),
            taskName: topTaskAgg[0].task.name,
            totalSeconds: topTaskAgg[0].totalSeconds,
          }
        : null;

    res.status(200).json({
      summary: {
        todaySeconds,
        weekSeconds,
        longestSessionSeconds,
        topTask,
      },
      todaySessions: formattedTodaySessions,
      weeklyTaskBreakdown,
    });
  } catch (err) {
    console.error("Analytics error", err);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
