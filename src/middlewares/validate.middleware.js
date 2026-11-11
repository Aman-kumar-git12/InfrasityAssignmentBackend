const validate = (validator) => (req, res, next) => {
  try {
    const message = validator(req.body);
    if (message) {
      const err = new Error(message);
      err.statusCode = 400;
      throw err;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default validate;
