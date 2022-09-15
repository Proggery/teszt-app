import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import path from "path";
import { fileURLToPath } from 'url';

// Routes
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";

const app = express();
const port = 5555;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Sikeres csatlakozás az adatbázishoz");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Hiba!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.use(express.static(path.resolve(__dirname, "client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/client/build', 'index.html'));
});


app.listen(port, () => {
  connect();
  console.log(`A szerver fut: http://localhost:${port}`);
});
