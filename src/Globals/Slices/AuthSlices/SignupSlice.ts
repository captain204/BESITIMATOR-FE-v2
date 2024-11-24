// signupSlice.ts
// import axiosInstanceAuth from "@/Globals/Interceptor";
import axiosInstanceAuth from "@/Globals/InterceptorAuth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignupData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface SignupState {
  loading: boolean;
  success: boolean;
  error: string | null;
  signupData: SignupData | null;
  response: any | null;
}

const initialState: SignupState = {
  loading: false,
  success: false,
  error: null,
  signupData: null,
  response: null,
};

export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async (signupData: SignupData, { rejectWithValue }) => {
    try {
      const response = await axiosInstanceAuth.post("api/register", signupData);
      if (response.status >= 200 && response.status < 300) {
        toast.warning("Signup successful!!!");
        const token = response.data.access_token;
        localStorage.setItem("token", token);
        window.location.href = "/create-profile";
      }
      return response.data;
    } catch (error: any) {
      console.log("Caught error:", error); // Log the entire error object
      if (error.response) {
        // Server responded with an error
        console.log(error.response);
        const message =
          error.response.data.message ||
          error.response.data.error ||
          "An error occurred";
        toast.error(message); // Show a specific error message
        return rejectWithValue(message); // Return the specific message
      } else {
        // An error occurred before reaching the server
        toast.error("An error occurred");
        return rejectWithValue("An error occurred"); // Generic error
      }
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    resetSignupState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.signupData = action.meta.arg;
        state.response = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSignupState } = signupSlice.actions;
export default signupSlice.reducer;
