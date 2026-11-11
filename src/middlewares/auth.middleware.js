import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      const err = new Error("Not authorized, please log in");
      err.statusCode = 401;
      throw err;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      const err = new Error("User no longer exists, please log in again");
      err.statusCode = 401;
      throw err;
    }

    req.user = { id: user._id.toString(), name: user.name, email: user.email };
    next();
  } catch (error) {
    next(error);
  }
};

export default protect;
