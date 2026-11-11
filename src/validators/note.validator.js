export const validateCreateNote = (body = {}) => {
  const { title, content } = body;
  if (!title || typeof title !== "string" || !title.trim()) return "Title is required";
  if (title.trim().length > 200) return "Title must be at most 200 characters";
  if (content !== undefined && typeof content !== "string") return "Content must be a string";
  return null;
};

export const validateUpdateNote = (body = {}) => {
  const { title, content } = body;
  if (title === undefined && content === undefined) {
    return "Provide a title or content to update";
  }
  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) return "Title cannot be empty";
    if (title.trim().length > 200) return "Title must be at most 200 characters";
  }
  if (content !== undefined && typeof content !== "string") return "Content must be a string";
  return null;
};
