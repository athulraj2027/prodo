import express from "express";
const router = express.Router();
import taskController from "../../controllers/task.js";

router
  .route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createTask)
  .patch(taskController.patchTask);

router.get("/completed", taskController.getCompletedTasks);

// router
//   .route("/:id")
//   .put(taskController.editTask)
//   .delete(taskController.dltTask)
//   .get(taskController.getTaskById);

export default router;
