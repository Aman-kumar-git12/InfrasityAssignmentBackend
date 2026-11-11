import Note from "../../models/Note.js";
import httpError from "../../utils/httpError.js";

const deleteNote = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({ _id: noteId, user: userId });
  if (!note) throw httpError(404, "Note not found");
  return note;
};

export default deleteNote;
