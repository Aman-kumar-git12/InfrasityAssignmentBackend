import registerUser from "../services/auth/registerUser.service.js";
import loginUser from "../services/auth/loginUser.service.js";
import getCurrentUser from "../services/auth/getCurrentUser.service.js";
import sendResponse from "../utils/sendResponse.js";
import cookieOptions from "../utils/cookieOptions.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const { user, token } = await registerUser({ name: name.trim(), email: email.trim(), password });
  res.cookie("token", token, cookieOptions);
  sendResponse(res, 201, "Account created successfully", { user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginUser({ email: email.trim(), password });
  res.cookie("token", token, cookieOptions);
  sendResponse(res, 200, "Logged in successfully", { user });
};

export const me = async (req, res) => {
  const user = await getCurrentUser(req.user.id);
  sendResponse(res, 200, "User fetched successfully", { user });
};

export const logout = (req, res) => {
  const { maxAge, ...clearOptions } = cookieOptions;
  res.clearCookie("token", clearOptions);
  sendResponse(res, 200, "Logged out successfully");
};
