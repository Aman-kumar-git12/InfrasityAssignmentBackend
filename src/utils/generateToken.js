import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  try {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
  } catch (error) {
    const err = new Error("Failed to generate authentication token");
    err.statusCode = 500;
    throw err;
  }
};

export default generateToken;
