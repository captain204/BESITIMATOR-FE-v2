import axiosInstance from "@/Globals/Interceptor";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


interface GetUserState {
  loading: boolean;
  success: boolean;
  error: string | null;
  response: any | null;
}

const initialState: GetUserState = {
  loading: false,
  success: false,
  error: null,
  response: null,
};

export const getUser = createAsyncThunk("api/user", async () => {
  try {
    const response = await axiosInstance.get("api/user");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      toast.error(error?.response?.data?.message); 
      console.log(error.response);
    } else {
      toast.error("An error occurred!!"); 
      // window.location.href = "/";
    }
    return error.response?.data?.error || "An error occurred";
  }
});

const getUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userDataState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.response = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { userDataState } = getUserSlice.actions;
export default getUserSlice.reducer;
