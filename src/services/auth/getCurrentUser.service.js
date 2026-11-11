import User from "../../models/User.js";

const getCurrentUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }
    return { id: user._id, name: user.name, email: user.email };
  } catch (error) {
    if (error.statusCode) throw error;
    const err = new Error("Failed to fetch current user");
    err.statusCode = 500;
    throw err;
  }
};

export default getCurrentUser;
