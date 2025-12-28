import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userSchema.js";
dotenv.config();

const userVerification = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (token === undefined) {
      return res.json({ status: false });
    }

    const decoded = jwt.verify(token, process.env.secretKey);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.json({ status: false, username: user.username });
    }

    console.log(user.username);
    return res.json({
      status: true,
      user: user.username,
    });
  } catch (err) {
    console.log("JWT verify error:", err);
    return res.json({ status: false });
  }
};

export default userVerification;
