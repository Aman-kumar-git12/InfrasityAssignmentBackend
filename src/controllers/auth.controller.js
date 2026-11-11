import registerUser from "../services/auth/registerUser.service.js";
import loginUser from "../services/auth/loginUser.service.js";
import getCurrentUser from "../services/auth/getCurrentUser.service.js";
import sendResponse from "../utils/sendResponse.js";
import cookieOptions from "../utils/cookieOptions.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await registerUser({ name: name.trim(), email: email.trim(), password });
    res.cookie("token", token, cookieOptions);
    sendResponse(res, 201, "Account created successfully", { user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email: email.trim(), password });
    res.cookie("token", token, cookieOptions);
    sendResponse(res, 200, "Logged in successfully", { user });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.id);
    sendResponse(res, 200, "User fetched successfully", { user });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { maxAge, ...clearOptions } = cookieOptions;
    res.clearCookie("token", clearOptions);
    sendResponse(res, 200, "Logged out successfully");
  } catch (error) {
    next(error);
  }
};
