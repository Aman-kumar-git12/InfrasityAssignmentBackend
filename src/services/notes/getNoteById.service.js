import Note from "../../models/Note.js";

const getNoteById = async (noteId, userId) => {
  try {
    // match on user too so nobody can open someone else's note
    const note = await Note.findOne({ _id: noteId, user: userId });
    if (!note) {
      const err = new Error("Note not found");
      err.statusCode = 404;
      throw err;
    }
    return note;
  } catch (error) {
    if (error.statusCode || error.name === "CastError") throw error;
    const err = new Error("Failed to fetch note");
    err.statusCode = 500;
    throw err;
  }
};

export default getNoteById;
