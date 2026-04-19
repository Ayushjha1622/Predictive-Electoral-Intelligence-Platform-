import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);
  next();
};

const signupValidation = [
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  validate
];

router.post("/signup", signupValidation, signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
