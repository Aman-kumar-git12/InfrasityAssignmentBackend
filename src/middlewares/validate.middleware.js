import httpError from "../utils/httpError.js";

const validate = (validator) => (req, res, next) => {
  const message = validator(req.body);
  next(message ? httpError(400, message) : undefined);
};

export default validate;
