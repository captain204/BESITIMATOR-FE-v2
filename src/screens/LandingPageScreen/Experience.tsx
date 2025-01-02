"use client";
import React from "react";
import ProgressSection from "./Progress";

const Experience = () => {
  // Animation Variants
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } },
  };
  return (
    <section className="relative bg-[url('/benifit.png')] bg-cover bg-center bg-no-repeat overflow-hidden">
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-95"></div>
      <div className="grid lg:mx-14 mx-6 lg:gap-10  lg:pt-16 lg:grid-cols-12">
        {/* Left Section: Benefits */}
        <div
          className="mr-auto  lg:col-span-6 relative"
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ once: true, amount: 0.2 }}
          // variants={textVariant}
        >
          <h1 className="max-w-2xl mb-2 text-xl font-extrabold tracking-tight leading-none md:text-3xl text-white lg:mt-0 my-6">
            Benefits of Using Our Web App
          </h1>

          <hr className="w-16 border-b-2 border-yellow-500 mb-4" />

          <ul className="space-y-4 text-white list-disc list-inside   marker:text-yellow-500">
            <li className="items-center">
            Helps automates material and labour requirements
            </li>
            <li className=" items-center list-inside   marker:text-yellow-500">
            Helps reduce the time to takeoff quantities from weeks to seconds
            </li>
            <li className="list-inside   marker:text-yellow-500 items-center">
            Helps reduce overhead
            </li>
            <li className=" items-center list-inside   marker:text-yellow-500">
            Curtail over pricing of labour and over purchasing of material items
            </li>
            <li className="list-inside   marker:text-yellow-500 items-center">
            Helps pre, during and post decision making for your construction projects
            </li>
          </ul>
        </div>

        {/* Right Section: Statement */}
        <div
          className="mr-auto  lg:col-span-6  relative md:mt-0 mt-4"
          // initial="hidden"
          // whileInView="visible"
          // viewport={{ once: true, amount: 0.2 }}
          // variants={textVariant}
        >
          <p className="text-white">
            Find out reliable information regarding your construction like
            approximate estimates for your construction project using our
            construction budget calculator, construction inventory and cost
            tracker application for your construction project, material and
            labour requirements for your construction project, reliable
            construction tradesmen and vendors, applicable material and labour
            price lists, information on construction events and workshops, and
            general construction information based on your geo-location.
          </p>

          <ProgressSection />
        </div>
      </div>
    </section>
  );
};

export default Experience;
