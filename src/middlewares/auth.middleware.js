import jwt from "jsonwebtoken";
import User from "../models/User.js";
import httpError from "../utils/httpError.js";

const protect = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) throw httpError(401, "Not authorized, please log in");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);
  if (!user) throw httpError(401, "User no longer exists, please log in again");

  req.user = { id: user._id.toString(), name: user.name, email: user.email };
  next();
};

export default protect;
