import Note from "../../models/Note.js";

const getUserNotes = (userId) => Note.find({ user: userId }).sort({ updatedAt: -1 });

export default getUserNotes;
