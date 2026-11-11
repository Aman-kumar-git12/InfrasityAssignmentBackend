import Note from "../../models/Note.js";
import httpError from "../../utils/httpError.js";

const updateNote = async (noteId, userId, { title, content }) => {
  const updates = {};
  if (title !== undefined) updates.title = title;
  if (content !== undefined) updates.content = content;

  const note = await Note.findOneAndUpdate({ _id: noteId, user: userId }, updates, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!note) throw httpError(404, "Note not found");
  return note;
};

export default updateNote;
