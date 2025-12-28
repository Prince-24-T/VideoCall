import jwt from "jsonwebtoken";

const verify = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(httpStatus.FOUND).json({ message: "token is not valid" });
  }
  const decode = jwt.verify(token, process.env.secretKey);
  console.log(decode);
  next();
};

export { verify };
