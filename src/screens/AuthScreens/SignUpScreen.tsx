"use client";

import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RootState } from "@/Globals/store/store";
import { Spinner } from "@material-tailwind/react";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { signupUser } from "@/Globals/Slices/AuthSlices/SignupSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

//  const success = useSelector((state: RootState) => state.signup.success);

const SignUpScreen = () => {
  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
    country: yup
      .string()
      .notOneOf(["Choose a country"], "Please select a valid country")
      .required("Country is required"),

    // Validate that role selection is not 'Select your role'
    role: yup
      .string()
      .notOneOf(["Select your role"], "Please select a valid role")
      .required("Role is required"),
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [countries, setCountries] = useState<string[]>([]); // State to hold country names
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const onSubmit = (data:any) => {
  //   console.log(data); // Handle form submission
  // };

  const onSubmit = () => {
    dispatch(
      signupUser({
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        country,
        builder_type: role,
        password_confirmation: confirmPassword,
      })
    );
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name"
      );
      const countryNames = response.data.map(
        (country: any) => country.name.common
      );
      setCountries(countryNames); // Update the state with fetched country names
    } catch (error) {
      console.error("Error fetching countries:", error);
      setCountries([]); // Set to empty array in case of an error
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div
      className="relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url("/benifit.png")' }}
    >
      <div className="absolute inset-0 bg-white  opacity-95"></div>
      <section className=" md:my-44 relative ">
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
                      First Name
                    </label>
                    <input
                      autoComplete="off"
                      {...register("firstName")}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        clearErrors("firstName");
                      }}
                      className="bg-transparent border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                    />
                    <p className="text-red-500 text-sm">
                      {errors.firstName?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Last Name
                    </label>
                    <input
                      autoComplete="off"
                      {...register("lastName")}
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        clearErrors("lastName");
                      }}
                      className="bg-transparent border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                    />
                    <p className="text-red-500 text-sm">
                      {errors.lastName?.message}
                    </p>
                  </div>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Select a Country
                    </label>
                    <select
                      {...register("country")}
                      className="border bg-transparent border-gray-300 text-sm rounded-lg block w-full p-2.5 text-black"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        clearErrors("country");
                      }}
                    >
                      <option className="bg-black">Choose a country</option>
                      {countries.map((countryName) => (
                        <option
                          key={countryName}
                          className="bg-black  text-white"
                          value={countryName}
                        >
                          {countryName}
                        </option>
                      ))}
                    </select>

                    <p className="text-red-500 text-sm">
                      {errors.country?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Who are you?
                    </label>
                    <select
                      {...register("role")}
                      className="border bg-transparent border-gray-300 text-sm rounded-lg block w-full p-2.5 text-black"
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                        clearErrors("role");
                      }}
                    >
                      <option
                        // selected
                        className="bg-black text-white"
                        value="self-builder"
                      >
                        Self Builder
                      </option>
                      <option className="bg-black text-white" value="Student">
                        Student
                      </option>
                      <option className="bg-black text-white" value="Estimator">
                        Estimator
                      </option>
                      <option
                        className="bg-black text-white"
                        value="Contractor"
                      >
                        Building Contractor
                      </option>
                      <option className="bg-black text-white" value="Academics">
                        Academics/Teaching Institution
                      </option>
                      <option className="bg-black text-white" value="Designer">
                        Architect/Designer
                      </option>
                      <option className="bg-black text-white" value="Other">
                        Other
                      </option>
                    </select>
                    <p className="text-red-500 text-sm">
                      {errors.role?.message}
                    </p>
                  </div>

                  <div></div>
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
