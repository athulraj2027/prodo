import { Request, Response } from "express";

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

const createTask = async (req: Request, res: Response) => {
  try {
    console.log("hidasfdfsad");
  } catch (error) {}
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
