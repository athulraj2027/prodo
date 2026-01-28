import mongoose from "mongoose";
import task from "../models/task.js";

const getAllTasks = async (req: any, res: any) => {
  const userId = req.auth().userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tasks = await task.find({
      userId,
      isDeleted: { $ne: true },
      $nor: [{ status: "COMPLETED", due_date: { $lt: today } }],
    });
    res
      .status(200)
      .json({ message: "All tasks retrieved successfully", tasks });
  } catch (error) {
    console.log("Error in fetching all tasks : ", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getTaskById = async (req: any, res: any) => {
  try {
  } catch (error) {}
};

export const createTask = async (req: any, res: any) => {
  try {
    const userId = req.auth().userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const {
      name,
      description,
      checkpoints = [],
      selectedPriority,
      selectedTag,
      date,
    } = req.body;

    if (!name || !selectedPriority || !selectedTag || !date)
      return res.status(400).json({ error: "Missing required fields" });

    const validCheckpoints = checkpoints.map((cp: string) => ({
      name: cp.trim() || "Unnamed checkpoint",
      completed: false,
    }));

    const newTask = await task.create({
      userId,
      name: name.trim(),
      description: description?.trim() || "",
      priority: selectedPriority,
      tag: selectedTag,
      due_date: new Date(date),
      checkpoints: validCheckpoints,
    });

    return res.status(201).json({
      message: "Task created successfully",
      newTask,
    });
  } catch (error) {
    console.error("Create task error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const editTask = async (req: any, res: any) => {
  try {
  } catch (error) {}
};

export const patchTask = async (req: any, res: any) => {
  try {
    const userId = req.auth()?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { taskId } = req.query;
    if (!taskId) {
      return res.status(400).json({ error: "Task ID not found" });
    }

    const { deleteTask } = req.body;

    if (deleteTask) {
      await task.findByIdAndUpdate({ _id: taskId }, { isDeleted: true });
      return res.status(200).json({ message: "Task deleted successfully" });
    }

    const { checkpoint, checkpoints } = req.body;

    if (Array.isArray(checkpoints) && !checkpoint) {
      const existingTask = await task.findOne({ _id: taskId, userId });
      if (!existingTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      // 1. Update checkpoint completed flags
      const bulkOps = checkpoints.map((cp: any) => ({
        updateOne: {
          filter: { _id: taskId, userId },
          update: {
            $set: {
              "checkpoints.$[elem].completed": cp.completed,
            },
          },
          arrayFilters: [{ "elem._id": new mongoose.Types.ObjectId(cp._id) }],
        },
      }));

      if (bulkOps.length > 0) {
        await task.bulkWrite(bulkOps);
      }

      // 2. Re-fetch updated task
      const updatedTask = await task.findOne({ _id: taskId, userId });
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found after update" });
      }

      // 3. Recompute task status (DERIVED STATE)
      const total = updatedTask.checkpoints.length;
      const completedCount = updatedTask.checkpoints.filter(
        (cp) => cp.completed,
      ).length;

      if (total > 0 && completedCount === total) {
        updatedTask.status = "COMPLETED";
      } else if (completedCount > 0) {
        updatedTask.status =
          updatedTask.due_date && updatedTask.due_date.getTime() < Date.now()
            ? "BACKLOG"
            : "IN_PROGRESS";
      } else {
        updatedTask.status = "TODO"; // 👈 IMPORTANT FIX
      }

      await updatedTask.save();

      return res.json({
        success: true,
        message: "Checkpoints updated successfully",
        task: updatedTask,
      });
    }
    if (checkpoint) {
      const validCheckpoint = {
        name: checkpoint.trim() || "Unnamed checkpoint",
        completed: false,
      };

      const updatedTask = await task.findOneAndUpdate(
        { _id: taskId, userId },
        { $push: { checkpoints: validCheckpoint } },
        { new: true },
      );

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }

      // Optional: ensure status isn't COMPLETED after adding new checkpoint
      if (updatedTask.status === "COMPLETED") {
        updatedTask.status = "IN_PROGRESS";
        await updatedTask.save();
      }

      return res.json({
        success: true,
        message: "Checkpoint added successfully",
        task: updatedTask,
      });
    }

    return res.status(400).json({ error: "Invalid request body" });
  } catch (error) {
    console.error("Error in patchTask controller:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const dltTask = async (req: any, res: any) => {
  const userId = req.auth().userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const { taskId } = req.query;
  if (!taskId) return res.status(401).json({ error: "Task ID not found" });
  try {
    await task.deleteOne({ userId, _id: taskId });
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getCompletedTasks = async (req: any, res: any) => {
  console.log("got request");
  const userId = req.auth().userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  try {
    const tasks = await task.find({ userId, status: "COMPLETED" });
    return res.json({ success: true, tasks });
  } catch (error) {
    console.error("Fetch completed tasks error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  createTask, // done
  editTask,
  dltTask, //done
  patchTask, // done
  getAllTasks, // done
  getTaskById,
  getCompletedTasks,
};
