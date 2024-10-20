"use client";
import Link from "next/link";
import React from "react";

const ResetPasswordScreen = () => {
  return (
    <div>
      <section className="bg-tetiary dark:bg-gray-900 md:my-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[70vh]">
          <div className="w-full bg-[#00000040] rounded-lg shadow dark:border md:mt-0 sm:max-w-md md:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
                Reset Password
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mb-6   bg-transparent border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}

                {/* </div> */}
                <Link href="/otp">
                  <button
                    type="submit"
                    className="w-full text-sm text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Send Password Reset Link
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPasswordScreen;
