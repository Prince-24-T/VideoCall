import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jsoWebToken = (id) => {
  return jwt.sign({ id }, process.env.secretKey, {
    expiresIn: "1h",
  });
};

export default jsoWebToken;
