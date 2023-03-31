import express from "express";
import {
  addNotes,
  getNotes,
  seenNotes,
} from "../controller/notificationController.js";
import auth from "../middleware/auth.js";

const notificationRouter = express.Router();

notificationRouter.post("/postNote", addNotes);
notificationRouter.get("/getNotes", getNotes);
notificationRouter.patch("/updateNotes", auth, seenNotes);

export default notificationRouter;
