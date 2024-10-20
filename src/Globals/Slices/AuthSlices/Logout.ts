// loginSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axiosInstance from "@/Globals/Interceptor";
// import axiosInstance from "../../../Interceptor";

export const logoutUser = createAsyncThunk(
  "login/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      // Remove token from local storage and cookies
      localStorage.removeItem("token");
      Cookies.remove("token");

      // Show success toast
      toast.success("Logout successful");
      
      return true;  // Return true to indicate success
    } catch (error: any) {
      toast.error("Failed to logout");
      return rejectWithValue("Failed to logout");
    }
  }
);


const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    success: false,
    error: null,
    signupData: null,
    response: null,
    token: null,
  },
  reducers: {
    resetSignupState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.signupData = null;
        state.response = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        // state.error = action.payload as string;
      });
  },
});

export const { resetSignupState } = loginSlice.actions;
export default loginSlice.reducer;
