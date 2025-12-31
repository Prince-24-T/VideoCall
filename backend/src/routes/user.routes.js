import { Router } from "express";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jsoWebToken from "../controllers/jsonwebToken.js";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import userVerification from "../controllers/userVerification.js";
import {
  login,
  register,
  authMe,
  addToHistory,
  getHistory,
  logout,
} from "../controllers/userController.js";
import { verify } from "../controllers/verifyController.js";
const router = Router();

router.route("/verify").get(verify);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/add_to_activity").post(addToHistory);
router.route("/get_all_activity").get(getHistory);
router.route("/userVerification").get(userVerification);
router.route("/logout").get(logout);

// router.route("/").post(userVerification);
export default router;
