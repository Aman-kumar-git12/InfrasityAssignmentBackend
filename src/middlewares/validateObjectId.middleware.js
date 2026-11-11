import mongoose from "mongoose";
import httpError from "../utils/httpError.js";

const validateObjectId = (req, res, next) => {
  const valid = mongoose.Types.ObjectId.isValid(req.params.id);
  next(valid ? undefined : httpError(400, "Invalid note id"));
};

export default validateObjectId;
