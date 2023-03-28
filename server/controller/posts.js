import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";

export const getData = async (req, res) => {
  try {
    const postMessages = await postMessage.find();
    console.log("done");
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const createPosts = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("no post with that id");
  }

  const postById = await postMessage.findById(_id);
  console.log(postById);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  console.log(index);

  if (index === -1) {
    post.likes.push(req.userId);
    post.likeCount += 1;
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
    post.likeCount -= 1;
  }
  const updatedPost = await postMessage.findByIdAndUpdate(
    _id,
    { ...post },
    {
      new: true,
    }
  );
  res.status(200).json(updatedPost);
};

export const deletedPost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("no post with that id");
  }
  const deletedPost = await postMessage.findByIdAndDelete(_id, {
    new: true,
  });
  res.json(deletedPost);
};

export const selectedPost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).send("no post with that id");
  }
  const selectedPost = await postMessage.findById(_id);
  res.status(200).json(selectedPost);
};

export const refreshPost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      res.status(404).send("no post with that id");
    }
    const selectedPost = await postMessage.findById(_id);
    res.status(200).json(selectedPost);
  } catch (error) {
    console.log(error);
  }
};
