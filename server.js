import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import postRoutes from "./modules/posts/postRoutes.js";
import userRoutes from "./modules/users/userRoutes.js";
import parkingLocationRoutes from "./modules/parkingLocations/parkingLocationRoutes.js";

const app = express();

app.use(
  cors(),
  express.urlencoded({ extended: true }),
  express.json({ extended: true })
);

app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/parkingLocations", parkingLocationRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://adi:parkware123@cluster0.7qsay.mongodb.net/parkwareDB?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000, () => console.log("Server running")))
  .catch(err => console.log(err));
