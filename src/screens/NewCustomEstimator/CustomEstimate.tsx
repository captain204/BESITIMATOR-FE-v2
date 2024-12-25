import React from "react";
import HeroSection from "./Hero";
import Stepform from "./Stepform";
import EstimatorProcess from "./MiddleSection";

const CustomEstimate = () => {
  return (
    <div className=" lg:mx-20">
      <HeroSection />
      <div className="">
        <EstimatorProcess />
      </div>
      <div>
        <Stepform />
      </div>
    </div>
  );
};

export default CustomEstimate;
