import express from "express";
import userController from "../../controllers/user";
const router = express.Router();

router.get("/me", userController.getUser);

export default router;
