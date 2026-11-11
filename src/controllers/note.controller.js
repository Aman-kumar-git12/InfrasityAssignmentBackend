import createNote from "../services/notes/createNote.service.js";
import getUserNotes from "../services/notes/getUserNotes.service.js";
import getNoteById from "../services/notes/getNoteById.service.js";
import updateNote from "../services/notes/updateNote.service.js";
import deleteNote from "../services/notes/deleteNote.service.js";
import sendResponse from "../utils/sendResponse.js";

export const create = async (req, res) => {
  const { title, content } = req.body;
  const note = await createNote(req.user.id, { title: title.trim(), content });
  sendResponse(res, 201, "Note created successfully", { note });
};

export const getAll = async (req, res) => {
  const notes = await getUserNotes(req.user.id);
  const message = notes.length ? "Notes fetched successfully" : "No notes yet. Create your first note!";
  sendResponse(res, 200, message, { notes });
};

export const getOne = async (req, res) => {
  const note = await getNoteById(req.params.id, req.user.id);
  sendResponse(res, 200, "Note fetched successfully", { note });
};

export const update = async (req, res) => {
  const { title, content } = req.body;
  const note = await updateNote(req.params.id, req.user.id, { title: title?.trim(), content });
  sendResponse(res, 200, "Note updated successfully", { note });
};

export const remove = async (req, res) => {
  await deleteNote(req.params.id, req.user.id);
  sendResponse(res, 200, "Note deleted successfully", { id: req.params.id });
};
