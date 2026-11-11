import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/note.routes.js";
import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import sendResponse from "./utils/sendResponse.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  sendResponse(res, 200, "Server is healthy", {
    uptime: process.uptime()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
