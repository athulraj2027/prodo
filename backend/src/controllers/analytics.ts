import session from "../models/session.js";

export const getAnalytics = async (req: any, res: any) => {
  try {
    console.log("hi");
    const userId = req.auth().userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const now = new Date();

    // ---- Time boundaries ----
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 6);
    startOfWeek.setHours(0, 0, 0, 0);

    /* =========================
       1. TODAY SESSIONS
    ========================= */
    const todaySessions = await session
      .find({
        userId,
        startedAt: { $gte: startOfToday },
      })
      .populate("taskId", "name")
      .sort({ startedAt: 1 })
      .lean();

    const todaySeconds = todaySessions.reduce((acc, s) => acc + s.duration, 0);

    const longestSessionSeconds =
      todaySessions.length > 0
        ? Math.max(...todaySessions.map((s) => s.duration))
        : null;

    const formattedTodaySessions = todaySessions.map((s) => ({
      sessionId: s._id.toString(),
      taskId: s.taskId._id.toString(),
      taskName: (s.taskId as any).name,
      startedAt: s.startedAt.toISOString(),
      endedAt: s.endedAt ? s.endedAt.toISOString() : "",
      durationSeconds: s.duration,
    }));

    /* =========================
       2. WEEKLY AGGREGATION
    ========================= */
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
      { $unwind: "$task" },
      {
        $addFields: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$startedAt",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            date: "$date",
            taskId: "$task._id",
            taskName: "$task.name",
          },
          seconds: { $sum: "$duration" },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          tasks: {
            $push: {
              taskId: { $toString: "$_id.taskId" },
              taskName: "$_id.taskName",
              seconds: "$seconds",
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const weeklyTaskBreakdown = weeklyAgg.map((d) => ({
      date: d._id,
      tasks: d.tasks,
    }));

    const weekSeconds = weeklyAgg.reduce(
      (acc, d) => acc + d.tasks.reduce((t: number, x: any) => t + x.seconds, 0),
      0,
    );

    /* =========================
       3. TOP TASK (WEEK)
    ========================= */
    const topTaskAgg = await session.aggregate([
      {
        $match: {
          userId,
          startedAt: { $gte: startOfWeek },
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

    const response = {
      summary: {
        todaySeconds,
        weekSeconds,
        longestSessionSeconds,
        topTask,
      },
      todaySessions: formattedTodaySessions,
      weeklyTaskBreakdown,
    };

    console.log(response);
    res.status(200).json(response);
  } catch (err) {
    console.error("Analytics error", err);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
