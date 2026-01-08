import { Request, Response } from "express";
import Task from "../models/task";

const getAllTasks = async (req: Request, res: Response) => {
  try {
    console.log("get route called");
    res
      .status(200)
      .json({ message: "All tasks retrieved successfully", tasks: [] });
  } catch (error) {}
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

    await Task.create({
      userId,
      name: name.trim(),
      description: description?.trim() || "",
      priority: selectedPriority,
      tag: selectedTag,
      due_date: new Date(date),
      checkpoints: validCheckpoints,
    });

    const newTasks = await Task.find({ userId });
    return res.status(201).json({
      message: "Task created successfully",
      newTasks,
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

const patchTask = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

const dltTask = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

export default {
  createTask,
  editTask,
  dltTask,
  patchTask,
  getAllTasks,
  getTaskById,
};
