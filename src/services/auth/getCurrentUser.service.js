import User from "../../models/User.js";
import httpError from "../../utils/httpError.js";

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw httpError(404, "User not found");
  return { id: user._id, name: user.name, email: user.email };
};

export default getCurrentUser;
