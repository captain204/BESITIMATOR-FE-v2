// axiosSetup.js
import axios from "axios";

const axiosInstanceAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
   
  },
});

export default axiosInstanceAuth;
