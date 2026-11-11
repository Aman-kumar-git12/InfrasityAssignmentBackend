import Note from "../../models/Note.js";

const getUserNotes = async (userId) => {
  try {
    return await Note.find({ user: userId }).sort({ updatedAt: -1 });
  } catch (error) {
    if (error.statusCode) throw error;
    const err = new Error("Failed to fetch notes");
    err.statusCode = 500;
    throw err;
  }
};

export default getUserNotes;
