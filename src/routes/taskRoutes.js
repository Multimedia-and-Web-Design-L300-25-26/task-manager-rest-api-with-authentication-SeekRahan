import express from "express";
import {
  createTask,
  getTasks,
  deleteTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.route("/").get(getTasks).post(createTask);
router.route("/:id").delete(deleteTask);

export default router;