import express from "express";
import sessionRoutes from "./session.js";
import taskRoutes from "./task.js";
import analyticsRoutes from "./analytics.js";
const router = express.Router();

router.use("/task", taskRoutes);
router.use("/session", sessionRoutes);
router.use("/analytics", analyticsRoutes);

export default router;
