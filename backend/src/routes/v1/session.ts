import express from "express";
import sessionController from "../../controllers/session";
const router = express.Router();

router.post("/start", sessionController.startSession);
router.put("/stop", sessionController.stopSession);
// router.get("/", sessionController.getActiveSession);

export default router;
