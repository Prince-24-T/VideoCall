import express from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import cookies from "cookie-parser";
import connectToServer from "./controllers/socketManger.js";
import userRoute from "./routes/user.routes.js";
import { authMe } from "./controllers/userController.js";
import useVerification from "./controllers/userVerification.js";
dotenv.config();

const app = express();
app.use(cookies());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);
const io = connectToServer(server);

const secretKey = process.env.secretKey;

app.use("/", userRoute);

const start = async () => {
  const mongoDb = await mongoose
    .connect(process.env.MongoUrl)
    .then(() => {
      console.log("DataBase is connected");
    })
    .catch((err) => {
      console.log(err);
    });
  server.listen(8080, () => {
    console.log("App is running at  8080");
  });
};
start();
