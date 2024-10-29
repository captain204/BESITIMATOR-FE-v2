"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  message: yup.string().required("Message is required"),
});

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const toggleDialog = () => setOpenDialog(!openDialog);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    setLoading(true);

    try {
      const response = await fetch("https://formspree.io/f/mdknakld", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        reset();
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
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
      <div className=" flex flex-col md:flex-row-reverse p-4 md:p-14 mt-10 justify-center items-center text-black">
        <ToastContainer />

        <Dialog open={openDialog} handler={toggleDialog} size="md">
          <DialogHeader>
            <Typography variant="h5">Request a Quote</Typography>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogBody>
              <div className="space-y-4">
                <div>
                  <Input
                    label="Your Name"
                    type="text"
                    {...register("name")}
                    error={errors.name?.message ? true : false}
                  />
                  {errors.name && (
                    <Typography variant="small" color="red">
                      {errors.name.message}
                    </Typography>
                  )}
                </div>
                <div>
                  <Input
                    label="Phone Number"
                    type="tel"
                    {...register("phone")}
                    error={errors.phone?.message ? true : false}
                  />
                  {errors.phone && (
                    <Typography variant="small" color="red">
                      {errors.phone.message}
                    </Typography>
                  )}
                </div>
              </div>
            </DialogBody>
            <DialogFooter className="space-x-4">
              <Button color="gray" variant="text" onClick={toggleDialog}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-yellow-700"
              >
                {loading ? "Requesting..." : "Request"}
              </Button>
            </DialogFooter>
          </form>
        </Dialog>

        <div
          // initial="hide"
          // whileInView="show"
          // exit="hide"
          // variants={bottomToTopVariants}
          // viewport={{
          //   once: true,
          // }}
          className="relative md:mt-0 mt-10 md:w-1/2 min-h-[480px] md:order-none order-1 text-black p-0 rounded-none shadow-lg mb-8 md:mb-0 md:ml-8 overflow-hidden bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url('/calc.png')` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-90"></div>

          {/* Content */}
          <div className="relative z-10 p-8 md:text-center text-left">
            <h2 className="md:text-3xl text-2xl font-bold text-white mb-6">
              Do you want to talk to us about your building construction?
            </h2>
            <h2 className="text-white mb-6 font-bold">
              Need clarifications with your construction process/approach or
              generally about your construction work? You can request a call
              back, and you will receive a call from our team within 24 hours.
            </h2>
            <div>
              <button
                onClick={toggleDialog}
                className="text-white py-3 px-6 font-bold rounded-full hover:border-yellow-700 hover:bg-yellow-700 border hover:text-black"
              >
                Request a quote
              </button>
            </div>
          </div>
        </div>

        {/* Form S*/}
        <div
          // initial="hide"
          // whileInView="show"
          // exit="hide"
          // variants={bottomToTopVariants}
          // viewport={{
          //   once: true,
          // }}
          className="md:w-1/2 p-8 bg-white  relative shadow-lg rounded-none border md:mt-0 mt-8"
        >
          <h2 className="md:text-3xl text-2xl font-bold mb-6 text-black">
            Subscribe to Save Millions on Your Building Project!
          </h2>
          <p className="mb-6 t text-black font-medium">
            Get updates on construction trends, promotions on materials, and
            money-saving tips.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-black bg-white focus:outline-none focus:ring-yellow-700 focus:border-yellow-700"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                  Other Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-black bg-white focus:outline-none focus:ring-yellow-700 focus:border-yellow-700"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-black bg-white focus:outline-none focus:ring-yellow-700 focus:border-yellow-700"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-black"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phone"
                  {...register("phone")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-black bg-white focus:outline-none focus:ring-yellow-700 focus:border-yellow-700"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div className="">
                <button
                  type="submit"
                  className="rounded-md hover:bg-black  py-3 px-6 shadow-sm text-lg font-medium text-white bg-yellow-700 hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:yellow-500"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Subscribe Now"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
