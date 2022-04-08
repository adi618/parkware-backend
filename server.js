import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import postRoutes from "./modules/posts/postRoutes.js";
import userRoutes from "./modules/users/userRoutes.js";

const app = express();

app.use(
  cors(),
  express.urlencoded({ extended: true }),
  express.json({ extended: true })
);

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

dotenv.config();
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const URI = process.env.MONGO_URL;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Test");
});

app.listen("5000", () => {
  console.log("listening on port 5000");
});
