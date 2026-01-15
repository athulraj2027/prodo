import express from "express";
import sessionRoutes from "./session.js";
import taskRoutes from "./task.js";
const router = express.Router();

router.use("/task", taskRoutes);
router.use("/session", sessionRoutes);

export default router;
