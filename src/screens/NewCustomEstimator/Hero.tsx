import React from "react";

const HeroSection = () => {
  return (
    <section className="  md:mt-10 md:mb-10 mt-10 flex items-center justify-center">
      <div className="container mx-auto px-4  justify-center flex flex-col lg:flex-row items-center lg:items-start gap-10">
        {/* Left Content */}
        <div className="text-left flex-1 justify-center items-center my-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-black ">
            {/* Custom Building Estimator and Building Budget Calculator */}
            Construction Developers Budget
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed ">
            Welcome to our Construction developers budget tool This tool
            specifically allows you to formulate a first level financial plan to
            aid proper decision making and allocation of resources ahead of your
            proposed development project
            {/* The custom building estimator will give you Bespoke/ Custom material
            and labour requirements of either an element of your construction
            work or your entire construction project or generally a bespoke item
            of work by uploading your drawings and inputing any other relevent
            information. */}
          </p>
          <button className="mt-6 px-6 py-3 bg-yellow-800 text-white rounded-lg shadow-md transition">
            Get Started
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src="/estimatehero.png"
            alt="Building Estimator Illustration"
            className=""
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
