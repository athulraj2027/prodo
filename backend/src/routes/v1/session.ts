import express from "express";
import sessionController from "../../controllers/session.js";
const router = express.Router();

router.post("/stop", sessionController.stopSession);

export default router;
