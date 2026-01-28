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

const patchTask = async (req: any, res: any) => {
  const userId = req.auth().userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  const { taskId } = req.query;
  if (!taskId) return res.status(401).json({ error: "Task ID not found" });
  const { checkpoint, checkpoints } = req.body;

  let updated;

  if (checkpoints && !checkpoint) {
    const neededTask = await task.findOne({ _id: taskId, userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 1. Update checkpoints
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

    await task.bulkWrite(bulkOps);

    // 2. Fetch updated task
    let updatedTask = await task.findOne({ _id: taskId, userId });

    if (!updatedTask) return res.status(400).json({ message: "No task found" });

    const total = updatedTask.checkpoints.length;
    const completedCount = updatedTask.checkpoints.filter(
      (cp) => cp.completed,
    ).length;
    if (total > 0 && completedCount === total) {
      updatedTask.status = "COMPLETED";
    } else if (completedCount > 0) {
      if (updatedTask.due_date.getTime() < Date.now()) {
        updatedTask.status = "BACKLOG";
      } else {
        updatedTask.status = "IN_PROGRESS";
      }
    }

    // save if changed
    await updatedTask.save();

    // 3. Return fresh task
    updatedTask = await task.findOne({ _id: taskId, userId });

    return res.json({
      success: true,
      message: "Checkpoints updated successfully",
      task: updatedTask,
    });
  }

  const validCheckpoint = {
    name: checkpoint.trim() || "Unnamed checkpoint",
    completed: false,
  };
  try {
    updated = await task.findOneAndUpdate(
      { _id: taskId, userId },
      {
        $push: { checkpoints: validCheckpoint },
      },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updated);
  } catch (error) {
    console.log("Error in adding checkpoint : ", error);
    res.status(500).json({ error: "Server error" });
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
