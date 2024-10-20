"use client";

import Link from "next/link";
import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";

export default function OtpInput() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, index: number) => {
    if (/[^0-9]/.test(value)) return; // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Move to the next input
    }
  };

  const handleBackspace = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move to the previous input
    }
  };

  return (
    <section className="bg-tetiary dark:bg-gray-900 md:my-10">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[70vh]">
        <div className="w-full bg-[#00000040] rounded-lg shadow dark:border md:mt-0 sm:max-w-md md:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
              Enter OTP
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div className="flex flex-col items-center space-y-4">
                <p className="text-sm text-slate-600">
                  Enter the 6-digit OTP sent to{" "}
                  <span className="font-bold">ausineblaise@gmail.com</span>
                </p>

                <div className="flex items-center space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(e.target.value, index)
                      }
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                        handleBackspace(e, index)
                      }
                      className="w-10 h-10 bg-transparent text-center placeholder:text-slate-400 text-slate-700 text-lg border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      ref={(el) => (inputRefs.current[index] = el)}
                    />
                  ))}
                  {/* <span className="text-2xl mx-2 text-slate-700">-</span> */}
                </div>

                <p className="text-xs text-slate-400 mt-4 pb-4">
                  Did not receive the code?{" "}
                  <span className="font-bold cursor-pointer">Resend</span>
                </p>
              </div>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}

              {/* </div> */}
              <Link href="/otp">
                <button
                  type="submit"
                  className="w-full text-sm text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Continue
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
