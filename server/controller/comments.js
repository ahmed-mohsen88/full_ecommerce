import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";

export const addComment = async (req, res) => {
  const { id: _id } = req.params;

  const comment = req.body.comment;
  const user = req.body.user;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("no post with that id");
  }

  let postById = await postMessage.findById(_id);

  const updatedPost = await postMessage.updateOne(postById, {
    comments: [...postById.comments, { comment: comment, user: user }],
  });
  postById = await postMessage.findById(_id);

  res.status(200).json(postById.comments);
};
