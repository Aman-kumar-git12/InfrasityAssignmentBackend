import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";

const loginUser = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }

    return {
      user: { id: user._id, name: user.name, email: user.email },
      token: generateToken(user._id),
    };
  } catch (error) {
    if (error.statusCode) throw error;
    const err = new Error("Failed to log in");
    err.statusCode = 500;
    throw err;
  }
};

export default loginUser;
