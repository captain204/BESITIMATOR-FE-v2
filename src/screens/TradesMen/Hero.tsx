import React from "react";

const HeroSection = () => {
  return (
    <>
      <section className="md:my-20 mt-10 flex items-center justify-center">
        <div className="container mx-auto md:px-4 px-6  justify-center flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Left Content */}
          <div className="text-left flex-1 justify-center items-center my-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Trades men/Construction Vendors Log
            </h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Get verified and reliable construction vendors and tradesmen for
              your construction project. Maybe, Tradesmen- Carpenteres,
              Electricians, Painters etc. Construction Vendors- Construction
              tools supplier, Cement suppliers, Sand, Grantie/Hardcore suppliers
              etc.
            </p>
            <button className="mt-6 px-6 py-3 bg-yellow-800 text-white rounded-lg shadow-md transition">
              Get Started
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <img
              src="/t.png"
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
