import Note from "../../models/Note.js";

const deleteNote = async (noteId, userId) => {
  try {
    const note = await Note.findOneAndDelete({ _id: noteId, user: userId });
    if (!note) {
      const err = new Error("Note not found");
      err.statusCode = 404;
      throw err;
    }
    return note;
  } catch (error) {
    if (error.statusCode || error.name === "CastError") throw error;
    const err = new Error("Failed to delete note");
    err.statusCode = 500;
    throw err;
  }
};

export default deleteNote;
