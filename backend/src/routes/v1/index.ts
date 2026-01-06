import express from "express";
import sessionRoutes from "./session";
import taskRoutes from "./task";
import userRoutes from "./user";
const router = express.Router();

router.use("/task", taskRoutes);
router.use("/session", sessionRoutes);
router.use("/user", userRoutes);

export default router;
