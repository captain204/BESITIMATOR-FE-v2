"use client";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaFacebook, FaGoogle} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RootState } from "@/Globals/store/store";
import { Spinner } from "@material-tailwind/react";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { signupUser } from "@/Globals/Slices/AuthSlices/SignupSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

//  const success = useSelector((state: RootState) => state.signup.success);

const SignUpScreen = () => {
  const schema = yup.object().shape({
    name: yup.string().required("First Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
    terms: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions"),
  });

  const loading = useSelector((state: RootState) => state.signup.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const onSubmit = (data:any) => {
  //   console.log(data); // Handle form submission
  // };

  const onSubmit = () => {
    dispatch(
      signupUser({
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      })
    );
  };


  return (
    <div
      className="relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url("/benifit.png")' }}
    >
      <div className="absolute inset-0 bg-white  opacity-95"></div>
      <section className=" md:my-20 relative ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
          <div className="w-full  shadow-xl rounded-lg border bg-white md:mt-0 sm:max-w-md md:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-black md:text-2xl ">
                Create an account
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Name
                    </label>
                    <input
                      autoComplete="off"
                      {...register("name")}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearErrors("name");
                      }}
                      className="bg-transparent border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                    />
                    <p className="text-red-500 text-sm">
                      {errors.name?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Your Email
                    </label>
                    <input
                      type="email"
                      autoComplete="nope"
                      {...register("email")}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value), clearErrors("email");
                      }}
                      className="bg-transparent border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                    />
                    <p className="text-red-500 text-sm ">
                      {errors.email?.message}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        {...register("password")}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          clearErrors("password");
                        }}
                        type={showPassword ? "text" : "password"}
                        className="bg-transparent border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <FaEye className="text-black" />
                        ) : (
                          <FaEyeSlash className="text-black" />
                        )}
                      </button>
                    </div>
                    <p className="text-red-500 text-sm">
                      {errors.password?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        {...register("confirmPassword")}
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          clearErrors("confirmPassword");
                        }}
                        type={showConfirmPassword ? "text" : "password"}
                        className="bg-transparent border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showConfirmPassword ? (
                          <FaEye className="text-black" />
                        ) : (
                          <FaEyeSlash className="text-black" />
                        )}
                      </button>
                    </div>
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword?.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-start cursor-pointer">
                  <div className="flex items-center h-5 ">
                    <input
                      {...register("terms")}
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 cursor-pointer"
                      // style={{backgroundColor: "yellow"}}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-light text-black">
                      I accept the{" "}
                      <a
                        className="font-medium text-black hover:underline"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                    <p className="text-red-500 text-sm">
                      {errors.terms?.message}
                    </p>
                  </div>
                </div>
                {loading ? (
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center text-black bg-yellow-700 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    <Spinner className="h-5 w-5 text-white" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full text-white font-bold bg-yellow-700 hover:bg-primary-700  rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Create an account
                  </button>
                )}

                <p className="text-sm font-light text-black text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login here
                  </Link>
                </p>

                <Typography
                  color="gray"
                  className="mt-4 text-center text-sm font-normal text-black"
                >
                  Or sign up with
                </Typography>

                <div className="flex flex-col space-y-3 mt-6">
                  <button
                    type="button"
                    className="flex items-center justify-center w-full text-white bg-[#1877F2]  font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    <FaFacebook className="mr-2" /> Sign up with Facebook
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center w-full text-white bg-[#DB4437] font-medium rounded-lg text-sm px-5 py-2.5"
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

export default SignUpScreen;
