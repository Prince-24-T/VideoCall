import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const jsoWebToken = (id) => {
  const token = jwt.sign({ id }, process.env.secretKey, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
  });
  return token;
};

export default jsoWebToken;
