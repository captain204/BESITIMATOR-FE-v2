import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import signupReducer from "../Slices/AuthSlices/SignupSlice";
import loginUserReducer from "../Slices/AuthSlices/LoginUserSlice";
import logoutReducer from "../Slices/AuthSlices/Logout";
import getUserReducer from "../Slices/AuthSlices/GetUser"
// import emailVerificationReducer from "../Slices/AuthSlice/EmailVerificationSlice";

const rootReducer = combineReducers({
  signup: signupReducer,
  // emailVerification: emailVerificationReducer,
  // otpVerification: otpVerificationReducer,
  loginUser: loginUserReducer,
  // resetPassword: resetPasswordReducer,
  // forgotPassword: forgotPasswordReducer,
  // resendOTP: resendOTPReducer,
  // createChannel: channelReducer,
  getUser: getUserReducer,
  // allchannels: getChannelsReducer,
  // getachannel: getChannelByIdReducer,
  // userChannel: userChannelReducer,
  // updateChannel: updateChannelReducer,
  // userSubscription: userSubscriptionReducer,
  // charge: chargeReducer,
  logout: logoutReducer,
  // updatePassword:  updatePasswordReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
