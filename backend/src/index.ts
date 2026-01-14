import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import v1Routes from "./routes/v1/index";
import { connectDB } from "./helpers/db";
import { requireAuth } from "./middlewares/clerkMiddleware";
import updateTaskStatus from "./jobs/update.task.status";
const app = express();
const PORT = process.env.PORT;
connectDB();
app.use(
  cors({ origin: [process.env.FRONTEND_URL as string], credentials: true })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());
app.use(requireAuth);
app.use("/api/v1", v1Routes);

updateTaskStatus();

app.listen(PORT, () =>
  console.log(`Server has been started at the port : ${PORT}`)
);
