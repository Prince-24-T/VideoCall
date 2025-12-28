import { React, useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import PersonIcon from "@mui/icons-material/Person";

export default function LandingPage() {
  const [token, setToken] = useState();
  const [message, setMessage] = useState(null);
  const [isLogin, setIsLogin] = useState();
  const [username, setUsername] = useState();

  const router = useNavigate();
  const handleLogout = async () => {
    let res = await axios.get(
      "https://videocallbackend-2q3i.onrender.com/logout",
      {
        withCredentials: true,
      }
    );

    setIsLogin(false);
    setUsername(null);
  };
  const userVerification = async () => {
    let res = await axios.get(
      "https://videocallbackend-2q3i.onrender.com/userVerification",
      {
        withCredentials: true,
      }
    );

    if (res.data.status) {
      setIsLogin(true);
      console.log(res.data);
      setUsername(res.data.user);
    } else {
      setIsLogin(false);
      setUsername(null);
    }
  };

  useEffect(() => {
    userVerification();
  }, []);

  useEffect(() => {
    const setMe = window.localStorage.getItem("message");
    if (setMe) {
      setMessage(setMe);
    }
    const timer = setTimeout(() => {
      setMessage(null);
      localStorage.removeItem("message");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="landingPageContainer">
      {message && (
        <Alert
          severity="success"
          sx={{
            position: "fixed",
            top: 20,
            right: 20,
            width: "auto",
            zIndex: 1000,
          }}
        >
          {message}
        </Alert>
      )}
      <nav className="navBar">
        <div className="left-nav">
          <h3>Apna Video Call</h3>
        </div>
        <div className="right-nav">
          <div className="right-nav-item">
            {username !== null ? (
              <p style={{ opacity: "0.5", fontSize: "1rem" }}>
                <PersonIcon />
                {username}
              </p>
            ) : (
              <></>
            )}
            <p onClick={() => router("/abcd")}>Join as Guest</p>
            <Link to="/auth">
              <p style={{ color: "white", textDecoration: "none" }}>Register</p>
            </Link>
            {isLogin === true ? (
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                {" "}
                <Button variant="contained">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div className="landingPageMiddle">
        <div className="middle_left">
          <div className="middleLeftContainer">
            <h3>Connect with your</h3>
            <h3>Love Ones</h3>
            <p>Conver a distance by apna video call</p>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                window.location.href = "/video";
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="middle-right">
          <img src="mobile.png" alt="CallImge"></img>
        </div>
      </div>
    </div>
  );
}
