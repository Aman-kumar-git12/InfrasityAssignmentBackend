import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      const err = new Error("Invalid note id");
      err.statusCode = 400;
      throw err;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default validateObjectId;
