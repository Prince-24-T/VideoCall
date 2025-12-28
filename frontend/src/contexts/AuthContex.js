import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const server = "http://";

export const AuthContext = createContext();

const client = axios.create({
  baseURL: `${server}`,
});

// const client = axios.create({
//   baseURL: `${server}/api/v1/users`,
// });

export const AuthProvider = ({ children }) => {
  const getUserHistory = async () => {
    try {
      const res = await client.get("/get_all_activity", {
        withCredentials: true,
      });

      return res.data.meetings;
    } catch (e) {
      throw e;
    }
  };

  const addToUserHistory = async (meetingCode) => {
    try {
      let request = await client.post(
        "/add_to_activity",
        { meeting_code: meetingCode },
        { withCredentials: true }
      );

      return request;
    } catch (err) {
      throw err;
    }
  };

  const data = { addToUserHistory, getUserHistory };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
