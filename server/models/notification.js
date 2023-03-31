import mongoose from "mongoose";

const notificationScheme = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  read: {
    type: Boolean,
    default: false,
  },
  userSeen: [String],
});

const notification = mongoose.model("notification", notificationScheme);
export default notification;
