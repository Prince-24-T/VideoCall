import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jsoWebToken = (id) => {
  const token = jwt.sign({ id }, process.env.secretKey, {
    expiresIn: "1h",
  });
  return token;
};

export default jsoWebToken;
