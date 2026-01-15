import { Request, Response } from "express";
import Task from "../models/task";
import mongoose from "mongoose";

const getAllTasks = async (req: any, res: any) => {
  const userId = req.auth().userId;
  if (!userId) return res.status(401).json({ error: "Unauthorized" });
  try {
    const tasks = await Task.find({ userId });
    res
      .status(200)
      .json({ message: "All tasks retrieved successfully", tasks });
  } catch (error) {
    console.log("Error in fetching all tasks : ", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getTaskById = async (req: Request, res: Response) => {
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

    const newTask = await Task.create({
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

const editTask = async (req: Request, res: Response) => {
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
    console.log("updating checkpoints ... : ", checkpoints);

    const task = await Task.findOne({ _id: taskId, userId });
    console.log("task : ", task);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
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

    await Task.bulkWrite(bulkOps);
    const updatedTask = await Task.findOne({ _id: taskId, userId });

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
    updated = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      {
        $push: { checkpoints: validCheckpoint },
      },
      { new: true }
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
    await Task.deleteOne({ userId, _id: taskId });
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
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
};
