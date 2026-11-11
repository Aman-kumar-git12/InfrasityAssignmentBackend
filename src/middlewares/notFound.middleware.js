const notFound = (req, res, next) => {
  try {
    const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    err.statusCode = 404;
    throw err;
  } catch (error) {
    next(error);
  }
};

export default notFound;
