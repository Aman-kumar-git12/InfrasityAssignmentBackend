import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";
import httpError from "../../utils/httpError.js";

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw httpError(401, "Invalid email or password");
  }

  return {
    user: { id: user._id, name: user.name, email: user.email },
    token: generateToken(user._id),
  };
};

export default loginUser;
