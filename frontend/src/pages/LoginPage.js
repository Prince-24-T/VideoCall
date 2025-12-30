import { React } from "react";
import { Button } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { server } from "../enviroment";

export default function LoginPage() {
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  console.log("object");

  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
    setMessage(window.localStorage.getItem("message"));
  }, []);
  const navigate = useNavigate();
  const handleInput = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/login`, credentials, {
        withCredentials: true,
      });
      console.log(response.data);
      window.localStorage.setItem("message", response.data.message);
      console.log(response.data.message);

      navigate("/");
    } catch (err) {
      console.log(err);
    }

    setCredentials({ ...credentials, email: "", password: "" });
  };

  return (
    <div className="RegisterPage">
      <div className="register_left"></div>

      <div className="register_right">
        <div className="registerRighContainer">
          <form onSubmit={handleSumbit}>
            <p style={{ fontSize: "2rem", opacity: "0.8", fontWiegth: "600" }}>
              Login Form
            </p>
            <HomeIcon color="success" />

            <div className="formUnder">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleInput}
                value={credentials.email}
                id="email"
                name="email"
                type="text"
                placeholder="enter your email"
              />
            </div>
            <div className="formUnder">
              <label htmlFor="pass">Password</label>
              <input
                onChange={handleInput}
                value={credentials.password}
                id="pass"
                name="password"
                type="string"
                placeholder="enter your password"
              />
            </div>
            {/* <button type="submit">Register</button> */}
            <Button variant="contained" type="sumit">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
