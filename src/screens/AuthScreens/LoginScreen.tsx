"use client";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaFacebook,
  FaGoogle,
  FaTwitter,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "@/Globals/store/store";
import { loginUser } from "@/Globals/Slices/AuthSlices/LoginUserSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@material-tailwind/react";
import { FiX } from "react-icons/fi";
import { FaX, FaXTwitter } from "react-icons/fa6";

// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch: AppDispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loginUser.loading);
  // const success = useSelector((state: RootState) => state.loginUser.success);

  const onSubmit = () => {
    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  // useEffect(() => {
  //   if (success) {
  //     dispatch(getUser());
  //   }
  // }, [success, dispatch]);

  return (
    <div
      className="relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url("/benifit.png")' }}
    >
      <div className="absolute inset-0 bg-white opacity-95"></div>

      <section className=" md:my-20 relative">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
          <div className="w-full bg-white  rounded-lg shadow border md:mt-0 sm:max-w-md md:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 shadow-xl">
              <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-black md:text-2xl">
                Login
              </h1>

              <form
                className="space-y-4 md:space-y-6 text-black"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    autoComplete="off"
                    {...register("email")}
                    id="email"
                    // onChange={(e) => setEmail(e.target.value)}
                    onChange={(e) => {
                      setEmail(e.target.value), clearErrors("email");
                    }}
                    className={`bg-transparent border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      id="password"
                      // onChange={(e) => setPassword(e.target.value)}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearErrors("password");
                      }}
                      className={`bg-transparent border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEye className="text-black" />
                      ) : (
                        <FaEyeSlash className="text-black" />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex font-bold justify-center text-sm text-white bg-yellow-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading ? (
                    <Spinner className="w-4 h-4 text-white f " />
                  ) : (
                    "Login"
                  )}
                </button>

                <div className="flex justify-between">
                  <div className="flex items-start ">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border cursor-pointer border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="md:ml-3 ml-1 text-sm ">
                      <label htmlFor="terms" className="font-light text-black">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link href="/reset-password">
                    <p className="text-sm font-light text-black hover:underline">
                      Forgot Password?
                    </p>
                  </Link>
                </div>

                <p className="text-sm font-light text-black text-center">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium italic text-primary-600 hover:underline"
                  >
                    SignUp here
                  </Link>
                </p>

                {/* <p className="text-sm font-light text-black text-center">
                  You don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Sign Up here
                  </Link>
                </p> */}

                <Typography
                  color="gray"
                  className="mt-4 text-center text-sm font-normal text-black"
                >
                  Or sign in with
                </Typography>

                <div className="flex flex-col space-y-3 mt-6">
                  <button
                    type="button"
                    className="flex items-center justify-center w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <FaFacebook className="mr-2" /> Sign up with Facebook
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    <FaGoogle className="mr-2" /> Sign up with Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center w-full text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    <FaXTwitter className="mr-2" />
                    Sign up with Twitter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginScreen;

// "use client";
// import { Typography } from "@material-tailwind/react";
// import Link from "next/link";
// import React from "react";
// import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
// import { RootState } from "@/Globals/store/store";
// import { loginUser } from "@/Globals/Slices/AuthSlices/LoginUserSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Spinner } from "@material-tailwind/react";

// // Validation schema
// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Please enter a valid email address")
//     .required("Email is required"),
//   password: yup.string().required("Password is required"),
// });

// type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

// const LoginScreen = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const dispatch: AppDispatch = useDispatch();

//   const loading = useSelector((state: RootState) => state.loginUser.loading);

//   const onSubmit = () => {
//     dispatch(
//       loginUser({
//         email,
//         password,
//       })
//     );
//   };

//   return (
//     <div>
//       <section className="bg-tetiary dark:bg-gray-900 md:my-20">
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
//           <div className="w-full bg-[#00000040] rounded-lg shadow dark:border md:mt-0 sm:max-w-md md:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
//                 Login
//               </h1>

//               <form
//                 className="space-y-4 md:space-y-6"
//                 onSubmit={handleSubmit(onSubmit)}
//               >
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-white"
//                   >
//                     Your Email
//                   </label>
//                   <input
//                     type="email"
//                     {...register("email")}
//                     id="email"
//                     className={`bg-transparent border ${
//                       errors.email ? "border-red-500" : "border-gray-300"
//                     } text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
//                   />
//                   {errors.email && (
//                     <p className="text-red-500 text-sm">
//                       {errors.email.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="block mb-2 text-sm font-medium text-white"
//                   >
//                     Password
//                   </label>
//                   <input
//                     type="password"
//                     {...register("password")}
//                     id="password"
//                     className={`bg-transparent border ${
//                       errors.password ? "border-red-500" : "border-gray-300"
//                     } text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
//                   />
//                   {errors.password && (
//                     <p className="text-red-500 text-sm">
//                       {errors.password.message}
//                     </p>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full text-sm text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 >
//                   Login
//                 </button>

//                 <div className="flex justify-between">
//                   <div className="flex items-start">
//                     <div className="flex items-center h-5">
//                       <input
//                         id="terms"
//                         aria-describedby="terms"
//                         type="checkbox"
//                         className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
//                       />
//                     </div>
//                     <div className="ml-3 text-sm ">
//                       <label htmlFor="terms" className="font-light text-white">
//                         Remember me
//                       </label>
//                     </div>
//                   </div>
//                   <Link href="/reset-password">
//                     <p className="text-sm font-light text-white hover:underline">
//                       Forgot Password?
//                     </p>
//                   </Link>
//                 </div>

//                 <Typography
//                   color="gray"
//                   className="mt-4 text-center font-normal text-white"
//                 >
//                   Or sign in with
//                 </Typography>

//                 <div className="flex flex-col space-y-3 mt-6">
//                   <button
//                     type="button"
//                     className="flex items-center justify-center w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                   >
//                     <FaFacebook className="mr-2" /> Sign up with Facebook
//                   </button>
//                   <button
//                     type="button"
//                     className="flex items-center justify-center w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
//                   >
//                     <FaGoogle className="mr-2" /> Sign up with Google
//                   </button>
//                   <button
//                     type="button"
//                     className="flex items-center justify-center w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
//                   >
//                     <FaTwitter className="mr-2" /> Sign up with Twitter
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LoginScreen;
