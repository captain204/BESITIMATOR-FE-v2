import React from "react";

const HeroSection = () => {
  return (
    <section className=" min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center lg:items-start gap-10">
        {/* Left Content */}
        <div className="text-left flex-1 justify-center items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Automated Building Estimator
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            This automated building estimator will give you quick estimates of
            materials and labour requirements you will need for different
            elements such as Concrete works, Formwork/Carpentry works, Tiling
            works, Reinforcement works, Damp proof courses, Filling works,
            Excavation works, Blockwork, Plastering works, Screeding works.
          </p>
          {/* <button className="mt-6 px-6 py-3 bg-yellow-800 text-white rounded-lg shadow-md transition">
            Get Started
          </button> */}
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src="/autohero.png"
            alt="Building Estimator Illustration"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
