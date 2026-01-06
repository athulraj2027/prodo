import express from "express";
const router = express.Router();
import taskController from "../../controllers/task";

router
  .route("/")
  .get(taskController.getAllTasks)
  .post(taskController.createTask);
router
  .route("/:id")
  .put(taskController.editTask)
  .delete(taskController.dltTask)
  .get(taskController.getTaskById)
  .patch(taskController.patchTask);

export default router;
