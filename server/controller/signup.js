import users from "../models/users.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const existingUser = await users.findOne({ email });
    if (!existingUser) res.status(404).json({ message: "user doesn't exists" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      res.status(400).json({ message: "invalid password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      {
        expiresIn: "1hr",
      }
    );
    res.status(200).json({
      result: {
        email: existingUser.email,
        name: existingUser.name,
        id: existingUser._id,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "some thing went wrong" });
  }
};

export const addUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email is already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "password doesn't match " });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await users.create({
      name: `${firstName} ${lastName}`,
      password: hashedPassword,
      email: email,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1hr",
    });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
};

