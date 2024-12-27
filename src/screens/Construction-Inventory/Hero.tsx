import React from "react";
import Head from "next/head";

const HeroSection = () => {
  return (
    <>
      <section className="md:my-20 mt-10 flex items-center justify-center">
        <div className="container mx-auto md:px-4 px-6  justify-center flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Left Content */}
          <div className="text-left flex-1 justify-center items-center my-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Construction Inventory/Cost Tracker
            </h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Use our construction inventory and cost tracker to get real time
              updates of the finances of your construction project (Expenditure
              analysis)- Amount budgeted versus actual amount expended on
              material and labour.
            </p>
            <button className="mt-6 px-6 py-3 bg-yellow-800 text-white rounded-lg shadow-md transition">
              Get Started
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <img
              src="/inventory.png"
              alt="Building Estimator Illustration"
              className=""
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
