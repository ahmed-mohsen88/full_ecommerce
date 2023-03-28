import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: Object,
  comments: [
    {
      user: String,
      comment: String,
    },
  ],
  likes: {
    type: [String],
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  creatorId: String,
});

const postMessage = mongoose.model("postMessage", postSchema);
export default postMessage;
