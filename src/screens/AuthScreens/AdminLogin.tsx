"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const AdminLoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://13.60.208.160/api/login", {
        email,
        password,
      });
      if (response.status >= 200 && response.status < 300) {
        toast.warning(response?.data?.message || "Login successful");
        console.log(response);
        const token = response.data.access_token;
        localStorage.setItem("token", token);
       
        Cookies.set("token", token);
        console.log(token);
        window.location.href = "/admin/dashboard";
      } else {
        setErrorMessage(response.data.message || "Login failed.");
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url("/benifit.png")' }}
    >
      <div className="absolute inset-0 bg-white opacity-95"></div>

      <section className="relative">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
          <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md md:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 shadow-xl">
              <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-black md:text-2xl">
                Admin Login
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
                    onChange={(e) => {
                      setEmail(e.target.value), clearErrors("email");
                    }}
                    className={`bg-transparent border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
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
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearErrors("password");
                      }}
                      className={`bg-transparent border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10`}
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

                {errorMessage && (
                  <p className="text-red-500 text-sm text-center">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full flex font-bold justify-center text-sm text-white bg-yellow-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5"
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner className="w-4 h-4 text-white" />
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLoginScreen;













// "use client";
// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
// import { RootState } from "@/Globals/store/store";
// import { useDispatch, useSelector } from "react-redux";
// import { Spinner } from "@material-tailwind/react";
// import { adminLogin } from "@/Globals/Slices/AuthSlices/AdminLoginSlice";


// // Validation schema
// const schema = yup.object().shape({
//   email: yup
//     .string()
//     .email("Please enter a valid email address")
//     .required("Email is required"),
//   password: yup.string().required("Password is required"),
// });

// type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;

// const AdminLoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     clearErrors,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const dispatch: AppDispatch = useDispatch();
//   const loading = useSelector((state: RootState) => state.adminlogin.loading);
  

//   const onSubmit = () => {
//     dispatch(
//         adminLogin({
//         email,
//         password,
//       })
//     );
//   };

//   return (
//     <div
//       className="relative bg-cover bg-center overflow-hidden"
//       style={{ backgroundImage: 'url("/benifit.png")' }}
//     >
//       <div className="absolute inset-0 bg-white opacity-95"></div>

//       <section className="  relative">
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
//           <div className="w-full bg-white  rounded-lg shadow border md:mt-0 sm:max-w-md md:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8 shadow-xl">
//               <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-black md:text-2xl">
//                 Admin Login
//               </h1>

//               <form
//                 className="space-y-4 md:space-y-6 text-black"
//                 onSubmit={handleSubmit(onSubmit)}
//               >
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="block mb-2 text-sm font-medium text-black"
//                   >
//                     Your Email
//                   </label>
//                   <input
//                     type="email"
//                     autoComplete="off"
//                     {...register("email")}
//                     id="email"
//                     onChange={(e) => {
//                       setEmail(e.target.value), clearErrors("email");
//                     }}
//                     className={`bg-transparent border ${
//                       errors.email ? "border-red-500" : "border-gray-300"
//                     } text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
//                     className="block mb-2 text-sm font-medium text-black"
//                   >
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       autoComplete="off"
//                       type={showPassword ? "text" : "password"}
//                       {...register("password")}
//                       id="password"
//                       onChange={(e) => {
//                         setPassword(e.target.value);
//                         clearErrors("password");
//                       }}
//                       className={`bg-transparent border ${
//                         errors.password ? "border-red-500" : "border-gray-300"
//                       } text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
//                     />
//                     <span
//                       className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <FaEye className="text-black" />
//                       ) : (
//                         <FaEyeSlash className="text-black" />
//                       )}
//                     </span>
//                   </div>
//                   {errors.password && (
//                     <p className="text-red-500 text-sm">
//                       {errors.password.message}
//                     </p>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full flex font-bold justify-center text-sm text-white bg-yellow-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                 >
//                   {loading ? (
//                     <Spinner className="w-4 h-4 text-white f " />
//                   ) : (
//                     "Login"
//                   )}
//                 </button>

             
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AdminLoginScreen;
