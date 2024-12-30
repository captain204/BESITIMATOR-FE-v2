"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Flip, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

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
  // name: string;
  email: string;
  phone: string;
  // message: string;
  firstName: string;
  otherName: string;
};

type QuoteFormData = {
  // email: string;
  phone: string;
  otherName: string;
};

type SubscribeFormData = {
  firstName: string;
  otherName: string;
  email: string;
  phone: string;
};

const quoteSchema = yup.object().shape({
  // email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  otherName: yup.string().required("Other Name is required"),
});

const subscribeSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  otherName: yup.string().required("Other Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

const schema = yup.object().shape({
  // name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  // message: yup.string().required("Message is required"),
  firstName: yup.string().required("First Name is required"),
  otherName: yup.string().required("Other Name is required"),
});

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const toggleDialog = () => setOpenDialog(!openDialog);
  const [firstName, setFirstName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm<FormData>({
  //   resolver: yupResolver(schema),
  // });

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register: registerQuote,
    handleSubmit: handleSubmitQuote,
    formState: { errors: errorsQuote },
  } = useForm<QuoteFormData>({
    resolver: yupResolver(quoteSchema),
  });

  



  // const onSubmitQuote: SubmitHandler<FormData> = async (data) => {
  //   setLoading(true);
  //   // Simulate an API call
  //   setTimeout(() => {
  //     toast.success("Quote requested successfully!");
  //     // alert("done")
  //     setLoading(false);
  //     // resetQuote(); // Reset the form after submission
  //     toggleDialog(); // Close the dialog
  //   }, 1000);
  // };

  const onSubmitQuote: SubmitHandler<QuoteFormData> = async (data) => {
    setLoading(true);
    setTimeout(() => {
      // toast.warning("Quote requested successfully!");
      toast.warning("Quote requested successfully!", {
        transition: Zoom,
        position: "top-right",
        icon: (
          <IoCheckmarkDoneCircleSharp className="text-yellow-700" size={24} />
        ),
      });
      setLoading(false);
      toggleDialog();
    }, 1000);
  };

  // OnSubmit function for Subscribe
  const onSubmitSubscribe: SubmitHandler<FormData> = async () => {
    setLoading(true);
    // Simulate an API call
    // toast.success("Subscribed successfully!");
    setTimeout(() => {
      // toast.success("Subscribed successfully!");

      toast.warning("Subscribed successfully!", {
        transition: Zoom,
        position: "top-right",
        icon: (
          <IoCheckmarkDoneCircleSharp className="text-yellow-700" size={24} />
        ),
      });
      // alert("done")
      setLoading(false);
      // resetSubscribe(); // Reset the form after submission
    }, 1000);
  };

  return (
    <div
      className="relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url("/benifit.png")' }}
    >
      <div className="absolute inset-0 bg-white opacity-95"></div>
      <div className=" flex flex-col md:flex-row-reverse p-4 md:p-14  justify-center items-center text-black">
        <Dialog open={openDialog} handler={toggleDialog} size="md">
          <DialogHeader>
            <Typography variant="h5">Request a Quote</Typography>
          </DialogHeader>
          <form onSubmit={handleSubmitQuote(onSubmitQuote)}>
            <DialogBody>
              <div className="space-y-4">
                <div>
                  <Input
                    label="Your Name"
                    type="text"
                    {...registerQuote("otherName")}
                    error={errorsQuote.otherName?.message ? true : false}
                  />
                  {errorsQuote.otherName && (
                    <Typography variant="small" color="red">
                      {errorsQuote.otherName.message}
                    </Typography>
                  )}
                </div>
                <div>
                  <Input
                    label="Phone Number"
                    type="tel"
                    {...registerQuote("phone")}
                    error={errorsQuote.phone?.message ? true : false}
                  />
                  {errorsQuote.phone && (
                    <Typography variant="small" color="red">
                      {errorsQuote.phone.message}
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
            <h2 className="text-white mb-6">
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
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmitSubscribe)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-black">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    clearErrors("firstName");
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-black bg-white focus:outline-none focus:ring-yellow-700 focus:border-yellow-700"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black">
                  Other Name
                </label>
                <input
                  type="text"
                  id="othername"
                  {...register("otherName")}
                  onChange={(e) => {
                    setOtherName(e.target.value);
                    clearErrors("otherName");
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-black bg-white focus:outline-none focus:ring-yellow-700 focus:border-yellow-700"
                />
                {errors.otherName && (
                  <p className="text-red-500 text-sm">
                    {errors.otherName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearErrors("email");
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-black bg-white focus:outline-none focus:ring-yellow-700 focus:border-yellow-700"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black">
                  Phone Number
                </label>
                <input
                  type="number"
                  id="phone"
                  {...register("phone")}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    clearErrors("phone");
                  }}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-black bg-white focus:outline-none focus:ring-yellow-700 focus:border-yellow-700"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              {/* <div className=""> */}

              {loading ? (
                <button
                  // type="submit"
                  className="rounded-md hover:bg-black  py-3 px-6 shadow-sm text-lg font-medium text-white bg-yellow-700 hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:yellow-500"
                  disabled={loading}
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-md hover:bg-black  py-3 px-6 shadow-sm text-lg font-medium text-white bg-yellow-700 hover:text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:yellow-500"
                  disabled={loading}
                >
                  Subscribe Now
                </button>
              )}

              {/* </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
