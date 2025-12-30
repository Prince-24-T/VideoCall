import { React } from "react";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../enviroment";

export default function RegisterPage() {
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
    setMessage(window.localStorage.getItem("message"));
  }, [token, setToken, message, setMessage]);
  const navigate = useNavigate();
  const handleInput = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/register`, credentials, {
        withCredentials: true,
      });

      window.localStorage.setItem("message", response.data.message);
      navigate("/video");
    } catch (err) {
      console.log(err);
    }

    setCredentials({ ...credentials, username: "", email: "", password: "" });
  };

  return (
    <div className="RegisterPage">
      <div className="register_left"></div>

      <div className="register_right">
        <div className="registerRighContainer">
          <form onSubmit={handleSumbit}>
            <p style={{ fontSize: "2rem", opacity: "0.8", fontWiegth: "600" }}>
              SigUp
            </p>
            <HomeIcon color="success" />

            <div className="formUnder">
              <label htmlFor="email" type="text">
                Email
              </label>
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
              <label htmlFor="user">Username</label>
              <input
                onChange={handleInput}
                value={credentials.username}
                id="user"
                name="username"
                type="text"
                placeholder="enter your username"
              />
            </div>
            <div className="formUnder">
              <label htmlFor="pass">Password</label>
              <input
                onChange={handleInput}
                value={credentials.password}
                id="pass"
                name="password"
                type="password"
                placeholder="enter your password"
              />
            </div>
            {/* <button type="submit">Register</button> */}
            <Button variant="contained" type="sumit">
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
