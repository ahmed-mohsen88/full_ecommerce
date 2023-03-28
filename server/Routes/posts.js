import express from "express";
import auth from "../middleware/auth.js";
import {
  getData,
  createPosts,
  updatePost,
  deletedPost,
  selectedPost,
  refreshPost,
} from "../controller/posts.js";

const router = express.Router();

router.get("/", getData);
router.post("/", auth, createPosts);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletedPost);
router.get("/:id", selectedPost);
router.get("/details/:id", refreshPost);

export default router;
