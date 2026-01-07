// models/Task.ts
import mongoose from "mongoose";
import { TASK_PRIORITY, TASK_STATUS, TASK_TAG } from "../lib/constants/enums";

const TaskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: TASK_STATUS,
      required: true,
      default: "TODO",
    },
    priority: {
      type: String,
      enum: TASK_PRIORITY,
      required: true,
      default: "MEDIUM",
    },
    tag: {
      type: String,
      enum: TASK_TAG,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
TaskSchema.index({ userId: 1, status: 1 });
TaskSchema.index({ userId: 1, priority: -1 });

export default mongoose.model("Task", TaskSchema);
