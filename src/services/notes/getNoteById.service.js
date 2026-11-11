import Note from "../../models/Note.js";
import httpError from "../../utils/httpError.js";

const getNoteById = async (noteId, userId) => {
  // match on user too so nobody can open someone else's note
  const note = await Note.findOne({ _id: noteId, user: userId });
  if (!note) throw httpError(404, "Note not found");
  return note;
};

export default getNoteById;
