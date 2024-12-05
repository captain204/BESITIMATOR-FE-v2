import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "@/Globals/Interceptor";

interface NewsletterFormInputs {
  subject: string;
  body: string;
}

const NewsletterForm = () => {
  const schema = yup.object().shape({
    subject: yup.string().required("Subject is required"),
    body: yup
      .string()
      .required("Body is required")
      .min(10, "Body must be at least 10 characters long"),
  });

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<NewsletterFormInputs> = async (data) => {
    setLoading(true);
    try {
      await axiosInstance.post("/api/admin/newsletter/send", data);

      toast.success("Newsletter sent successfully!");
      reset();

      setLoading(false);
    } catch (error) {
      toast.error("Failed to send newsletter. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center  p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        {/* <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Send Newsletter</h1> */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Subject Input */}
          <div className="mb-4">
            <label
              htmlFor="subject"
              className="block text-black font-medium mb-2"
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              className={`w-full px-4 py-2 rounded-md text-black border ${
                errors.subject ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("subject")}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Body Textarea */}
          <div className="mb-4">
            <label htmlFor="body" className="block text-black font-medium mb-2">
              Body
            </label>
            <textarea
              id="body"
              className={`w-full px-4 py-2 h-32 text-black rounded-md border ${
                errors.body ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("body")}
            />
            {errors.body && (
              <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            {loading ? (
              <button
                type="submit"
                className="w-full bg-yellow-800 text-white py-2 px-4 rounded-md transition duration-300"
              >
                loading ...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-yellow-800 text-white py-2 px-4 rounded-md transition duration-300"
              >
                Send Newsletter
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;
