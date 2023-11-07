import path from "path";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import UserRouter from "./routes/UserRoute.js";
import PostRouter from "./routes/PostRoutes.js";
import UploadRoutes from "./routes/uploadRoutes.js";
import connect from "../db/connectDb.js";
import cookieParser from "cookie-parser";
const PORT = process.env.POST || 5000;

connect();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", UserRouter);
app.use("/api/posts", PostRouter);
app.use("/api/upload", UploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log("server listening");
});
