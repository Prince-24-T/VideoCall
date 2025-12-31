import { Router } from "express";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jsoWebToken from "../controllers/jsonwebToken.js";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { Meeting } from "../models/meetingModel.js";

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        message: "user already exist with this email address",
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      username,
      password: hashedPass,
    });
    const token = jsoWebToken(newUser._id);

    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      secure: true,
      httpOnly: true, // set true for secure auth
      sameSite: "none",
      path: "/",
      partitioned: true,
    });

    return res.status(201).json({ message: "User is registed" });
  } catch (err) {
    console.log(err.message);
    return res.json({ message: "Server error" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await User.findOne({ email });
    if (!newUser) {
      return res.json({ message: "Email is Incorrect" });
    }
    const hashPass = await bcrypt.compare(password, newUser.password);
    if (!hashPass) {
      return res.json({ message: "Password is Incorrect" });
    }
    const token = jsoWebToken(newUser._id);
    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      secure: true,
      httpOnly: true, // set true for secure auth
      sameSite: "none",
      path: "/",
      partitioned: true,
    });

    return res.status(201).json({ message: "User is LoggedIn" });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Server error" });
  }
};

const authMe = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ auth: false });

  const user = jwt.verify(token, process.env.secretKey);
  return res.json({ auth: true, user });
};

const getHistory = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.secretKey);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const meetings = await Meeting.find({ user_id: user._id });

    return res.json({ meetings });
  } catch (e) {
    console.log(e);
    return res.json({ message: `Something went wrong: ${e}` });
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      partitioned: true,
    });
    return res.status(201).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err.message);
  }
};

const addToHistory = async (req, res, next) => {
  try {
    const { meeting_code } = req.body;
    let token = req.cookies.token;
    if (!token) {
      return res.json({ message: "Not Token" });
    }
    let decode = await jwt.verify(token, process.env.secretKey);
    const user = await User.findById(decode.id);
    const newMeeting = new Meeting({
      user_id: user.id,
      meetingCode: meeting_code,
    });
    await newMeeting.save();
    return res.status(201).json({ message: "Added code to history" });
  } catch (e) {
    return res.json({ message: `Something went wrong ${e}` });
  }
};

export { login, register, authMe, getHistory, addToHistory, logout };
