const errorHandler = (err, req, res, next) => {
  try {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";

    if (err.type === "entity.parse.failed") {
      statusCode = 400;
      message = "Invalid JSON in request body";
    } else if (err.name === "ValidationError") {
      statusCode = 400;
      message = Object.values(err.errors).map((e) => e.message).join(", ");
    } else if (err.name === "CastError") {
      statusCode = 400;
      message = `Invalid value for ${err.path}`;
    } else if (err.code === 11000) {
      statusCode = 409;
      message = "Email is already registered";
    } else if (err.name === "TokenExpiredError") {
      statusCode = 401;
      message = "Session expired, please log in again";
    } else if (err.name === "JsonWebTokenError") {
      statusCode = 401;
      message = "Invalid token, please log in again";
    }

    if (statusCode === 500) {
      console.error(err);
      if (process.env.NODE_ENV === "production") message = "Internal server error";
    }

    res.status(statusCode).json({ success: false, message });
  } catch (error) {
    console.error("Error handler failed:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default errorHandler;
