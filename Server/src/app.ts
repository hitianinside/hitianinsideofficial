import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

// Routers
import userGetRouter from "./routers/userRouters/userGetRouters";
import authRouter from "./routers/authRouter/authRouter";
import userPostRouter from "./routers/userRouters/userPostRouters";
import adminPostRouter from "./routers/adminRouters/adminPostRouters";
import adminPatchRouter from "./routers/adminRouters/adminPatchRouters";
import adminDeleteRouter from "./routers/adminRouters/adminDeleteRouters";
import adminGetRouter from "./routers/adminRouters/adminGetRouter";

// Utils
import { dbConn } from "./utils/dbConnection";
import userPatchRouter from "./routers/userRouters/userPATCHRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_SITE_URL = process.env.CLIENT_SITE_URL || "http://localhost:3000";

dbConn();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: CLIENT_SITE_URL,
    credentials: true,
  })
);

// Serve static files
app.use("/uploads", express.static(path.resolve("uploads")));

//API Routes
app.use("/api/user", userGetRouter);
app.use("/api/user", userPostRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminPostRouter);
app.use("/api/admin", adminPatchRouter);
app.use("/api/admin", adminDeleteRouter);
app.use("/api/admin", adminGetRouter);
app.use("/api/user", userPatchRouter);

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 HITian Inside Server is Running Successfully!");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
