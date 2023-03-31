import mongoose from "mongoose";
import notification from "../models/notification.js";

export const addNotes = (req, res) => {
  try {
    console.log(req.body);
    const { title, message, creator } = req.body;
    const notes = {
      title: title,
      message: message,
      creator: creator,
    };
    console.log(title);
    notification.create(notes);
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
  }
};

export const getNotes = async (req, res) => {
  try {
    const allNotes = await notification.find();
    console.log(allNotes);
    res.status(200).json(allNotes);
  } catch (error) {
    console.log(error);
  }
};

export const seenNotes = async (req, res) => {
  try {
    const allNotes = await notification.find();
    const seenUsers = allNotes.map(async (note) => {
      const updatedNote = await notification.findById(note._id);
      const index = await note.userSeen.findIndex(
        (id) => id === String(req.userId)
      );
      if (index === -1) {
        await notification.updateOne(updatedNote, {
          userSeen: [...note.userSeen, req.userId],
        });
      }
    });

    // console.log(seenUsers);
    // res.status(200).json(allNotes);
  } catch (error) {
    console.log(error);
  }
};
