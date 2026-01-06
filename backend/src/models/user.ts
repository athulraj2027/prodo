import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true, 
    },
    email: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
