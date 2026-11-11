import Note from "../../models/Note.js";

const createNote = async (userId, { title, content }) => {
  try {
    return await Note.create({ title, content, user: userId });
  } catch (error) {
    if (error.statusCode || error.name === "ValidationError") throw error;
    const err = new Error("Failed to create note");
    err.statusCode = 500;
    throw err;
  }
};

export default createNote;
