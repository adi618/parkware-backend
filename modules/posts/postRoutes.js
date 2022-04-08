import { Router } from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "./postController.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;