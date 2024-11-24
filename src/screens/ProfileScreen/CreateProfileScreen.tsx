"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import axiosInstance from "@/Globals/Interceptor";
import { toast, Zoom } from "react-toastify";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const CreateProfileScreen = () => {
  const schema = yup.object().shape({
    firstname: yup.string().required("First Name is required"),
    lastname: yup.string().required("Last Name is required"),
    phone: yup.string().required("Phone Number is required"),
    country: yup
      .string()
      .notOneOf(["Choose a country"], "Please select a valid country")
      .required("Country is required"),
    builder_type: yup
      .string()
      .notOneOf(["Select your role"], "Please select a valid role")
      .required("Role is required"),

    birthdate: yup.date().required("Date of Birth is required"),
    bio: yup.string().required("Bio is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");
  const [countries, setCountries] = useState<string[]>([]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const formattedData = {
      ...data,
      birthdate: new Date(data.birthdate).toISOString().split("T")[0],
    };

    try {
      const response = await axiosInstance.post(
        "api/users/profile",
        formattedData
      );
      // console.log("Profile created successfully:", response.data);
      toast.warning("Profile created successfully!!", {
        transition: Zoom,
        position: "top-right",
        icon: (
          <IoCheckmarkDoneCircleSharp className="text-yellow-700" size={24} />
        ),
      });

      window.location.href = "/login";
    } catch (error: any) {
      console.error("Error creating profile:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred while creating the profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name"
      );
      const countryNames = response.data.map(
        (country: any) => country.name.common
      );
      setCountries(countryNames);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setCountries([]);
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
      <section className=" md:my-20 relative ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
          <div className="w-full  shadow-xl rounded-lg border bg-white md:mt-0 sm:max-w-md md:max-w-lg xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-black md:text-2xl ">
                Create a Profile
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
                      {...register("firstname")}
                      value={firstname}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        clearErrors("firstname");
                      }}
                      className="bg-transparent border border-black text-black text-sm  block w-full p-2.5"
                    />
                    <p className="text-red-500 text-sm">
                      {errors.firstname?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Last Name
                    </label>
                    <input
                      autoComplete="off"
                      {...register("lastname")}
                      value={lastname}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        clearErrors("lastname");
                      }}
                      className="bg-transparent border border-black text-black text-sm  block w-full p-2.5"
                    />
                    <p className="text-red-500 text-sm">
                      {errors.lastname?.message}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      autoComplete="nope"
                      {...register("phone")}
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value), clearErrors("phone");
                      }}
                      className="bg-transparent border border-black text-black text-sm  block w-full p-2.5"
                    />
                    <p className="text-red-500 text-sm ">
                      {errors.phone?.message}
                    </p>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      {...register("birthdate")}
                      className="bg-transparent border border-black text-black text-sm  block w-full p-2.5"
                    />
                    <p className="text-red-500 text-sm">
                      {errors.birthdate?.message}
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
                      className="border bg-transparent border-black text-sm  block w-full p-2.5 text-black"
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
                      {...register("builder_type")}
                      className="border bg-transparent border-black text-sm  block w-full p-2.5 text-black"
                      // value={role}
                      // onChange={(e) => {
                      //   setRole(e.target.value);
                      //   clearErrors("builder_type");
                      // }}
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
                      {errors.builder_type?.message}
                    </p>
                  </div>

                  <div></div>
                </div>

                <div className="mt-0">
                  <label className="block mb-2 text-sm font-medium text-black">
                    Bio
                  </label>
                  <textarea
                    {...register("bio")}
                    className="bg-transparent border border-black text-black  block w-full p-2.5"
                    rows={4}
                    placeholder="Provide additional details..."
                  ></textarea>
                  <p className="text-red-500 text-sm">{errors.bio?.message}</p>
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
                    Create Profile
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateProfileScreen;
