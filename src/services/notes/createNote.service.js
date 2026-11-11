import Note from "../../models/Note.js";

const createNote = (userId, { title, content }) => Note.create({ title, content, user: userId });

export default createNote;
