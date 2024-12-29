import React from "react";

const HeroSection = () => {
  return (
    <>
      <section className="md:my-20 mt-10 flex items-center justify-center">
        <div className="container mx-auto md:px-4 px-6  justify-center flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Left Content */}
          <div className="text-left flex-1 justify-center items-center my-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Applicable Material and labour rates/Pricelist
            </h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Get applicable material price-list and labour rates for your
              building construction project. Labour rates may be either daily
              rates, per linear meter rates(Lin.m), per area rates(m2) and per
              vloume rates(m3). Please note that material price-list and labour
              rates may differ per geo-location.
            </p>
            <button className="mt-6 px-6 py-3 bg-yellow-800 text-white rounded-lg shadow-md transition">
              Get Started
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-1">
            <img
              src="/m.png"
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
