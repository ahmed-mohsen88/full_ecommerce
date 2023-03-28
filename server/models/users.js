import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const users = mongoose.model("users", usersSchema);
export default users;
