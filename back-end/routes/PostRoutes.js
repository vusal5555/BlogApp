import express from "express";

const router = express.Router();
import {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
  getMyPosts,
  createComment,
} from "../controllers/PostController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(getAllPosts);
router.route("/mine").get(protect, getMyPosts);
router.route("/create").post(protect, createPost);
router
  .route("/:id")
  .get(getPostById)
  .delete(protect, deletePost)
  .put(protect, updatePost);
router.route("/:id/comments").post(protect, createComment);

export default router;
