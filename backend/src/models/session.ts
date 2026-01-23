// models/Session.ts
import mongoose from "mongoose";

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
    startedAt: {
      type: Date,
      required: true,
    },
    endedAt: {
      type: Date,
      required: false,
    },
    duration: {
      type: Number, // seconds
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
SessionSchema.index({ userId: 1, state: 1 });
SessionSchema.index({ userId: 1, startedAt: -1 });

export default mongoose.model("Session", SessionSchema);
