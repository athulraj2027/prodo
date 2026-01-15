// models/Session.ts
import mongoose from "mongoose";
import { SESSION_STATE } from "../lib/constants/enums";

const SessionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    state: {
      type: String,
      enum: SESSION_STATE,
      required: true,
      default: "RUNNING",
    },
    startedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endedAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
SessionSchema.index({ userId: 1, state: 1 });
SessionSchema.index({ userId: 1, startedAt: -1 });

export default mongoose.model("Session", SessionSchema);
