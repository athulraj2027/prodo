import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import v1Routes from "./routes/v1/index.js";
import { connectDB } from "./helpers/db.js";
import { requireAuth } from "./middlewares/clerkMiddleware.js";
import { startCronJobs } from "./jobs/cron.js";
import cronRoutes from "./routes/v1/cron.js";

const app = express();
const PORT = process.env.PORT;
connectDB();
app.use(
  cors({ origin: [process.env.FRONTEND_URL as string], credentials: true }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/cron", cronRoutes);
startCronJobs();
app.use(clerkMiddleware());
app.use(requireAuth);
app.use("/api/v1", v1Routes);

app.listen(PORT, () =>
  console.log(`Server has been started at the port : ${PORT}`),
);
