// axiosSetup.js
import axios from "axios";

const axiosInstanceAuth = axios.create({
  baseURL: "http://13.60.208.160",
  headers: {
    "Content-Type": "application/json",
   
  },
});

export default axiosInstanceAuth;
