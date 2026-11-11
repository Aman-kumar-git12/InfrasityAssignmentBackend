const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// returns an error message, or null if the body is ok
export const validateSignup = (body = {}) => {
  const { name, email, password } = body;
  if (!name || typeof name !== "string" || !name.trim()) return "Name is required";
  if (!email || typeof email !== "string" || !email.trim()) return "Email is required";
  if (!EMAIL_REGEX.test(email.trim())) return "Please provide a valid email";
  if (!password || typeof password !== "string") return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};

export const validateLogin = (body = {}) => {
  const { email, password } = body;
  if (!email || typeof email !== "string" || !email.trim()) return "Email is required";
  if (!password || typeof password !== "string") return "Password is required";
  return null;
};
