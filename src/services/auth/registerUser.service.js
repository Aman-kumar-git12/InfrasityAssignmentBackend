import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";
import httpError from "../../utils/httpError.js";

const registerUser = async ({ name, email, password }) => {
  if (await User.exists({ email: email.toLowerCase() })) {
    throw httpError(409, "Email is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  return {
    user: { id: user._id, name: user.name, email: user.email },
    token: generateToken(user._id),
  };
};

export default registerUser;
