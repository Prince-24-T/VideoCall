import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import VideoMeet from "./pages/VideoMeet";
import Alert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import { AuthProvider } from "./contexts/AuthContex";
import History from "./pages/History";
function App() {
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const setMe = window.localStorage.getItem("message");
    if (setMe) {
      setMessage(setMe);
    }
    const timer = setTimeout(() => {
      setMessage(null);
    }, 2000);
    return clearTimeout(timer);
  }, [message]);
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<RegisterPage />} />
            <Route path="/home" element={<Home />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/:url" element={<VideoMeet />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
