import { Router } from "express";
import { create, getAll, getOne, update, remove } from "../controllers/note.controller.js";
import protect from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import validateObjectId from "../middlewares/validateObjectId.middleware.js";
import { validateCreateNote, validateUpdateNote } from "../validators/note.validator.js";

const router = Router();

router.use(protect);

router.get("/", getAll);
router.post("/", validate(validateCreateNote), create);
router.get("/:id", validateObjectId, getOne);
router.put("/:id", validateObjectId, validate(validateUpdateNote), update);
router.delete("/:id", validateObjectId, remove);

export default router;
