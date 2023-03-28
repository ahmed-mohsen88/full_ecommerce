import express from "express";
import auth from "../middleware/auth.js";
import { addComment } from "../controller/comments.js";

const commentsRouter = express.Router();

commentsRouter.patch("/:id", auth, addComment);

export default commentsRouter;
