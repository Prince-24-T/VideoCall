import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useNavigate();

    const isAuthenticated = async () => {
      let res = await axios.get(
        "https://videocallbackend-2q3i.onrender.com/userVerification",
        {
          withCredentials: true,
        }
      );
      if (res.data.status === false) {
        return false;
      }

      return true;
    };

    useEffect(() => {
      const check = async () => {
        let loggedIn = await isAuthenticated();
        if (!loggedIn) {
          router("/auth");
        }
      };
      check();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};
export default withAuth;
