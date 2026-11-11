import httpError from "../utils/httpError.js";

const notFound = (req, res, next) => {
  next(httpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export default notFound;
