import { Router } from "express";
import { signup, login, me, logout } from "../controllers/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { validateSignup, validateLogin } from "../validators/auth.validator.js";

const router = Router();

router.post("/signup", validate(validateSignup), signup);
router.post("/login", validate(validateLogin), login);
router.get("/me", protect, me);
router.post("/logout", protect, logout);

export default router;
