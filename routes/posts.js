import express from "express";
import {
  getPostsBySearch,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// /posts is used in the server index.js
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/search", getPostsBySearch);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/likePost", auth, likePost);
router.delete("/:id", auth, deletePost);

export default router;
