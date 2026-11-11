import Note from "../../models/Note.js";

const updateNote = async (noteId, userId, { title, content }) => {
  try {
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;

    const note = await Note.findOneAndUpdate({ _id: noteId, user: userId }, updates, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!note) {
      const err = new Error("Note not found");
      err.statusCode = 404;
      throw err;
    }
    return note;
  } catch (error) {
    if (error.statusCode || error.name === "ValidationError" || error.name === "CastError") {
      throw error;
    }
    const err = new Error("Failed to update note");
    err.statusCode = 500;
    throw err;
  }
};

export default updateNote;
