import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";

const registerUser = async ({ name, email, password }) => {
  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      const err = new Error("Email is already registered");
      err.statusCode = 409;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return {
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id),
    };
  } catch (error) {
    if (error.statusCode || error.name === "ValidationError" || error.code === 11000) {
      throw error;
    }
    const err = new Error("Failed to register user");
    err.statusCode = 500;
    throw err;
  }
};

export default registerUser;
