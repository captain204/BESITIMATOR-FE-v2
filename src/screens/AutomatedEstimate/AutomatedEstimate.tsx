import React from "react";
import HeroSection from "./Hero";
import Stepform from "./Stepform";
import EstimatorProcess from "./MiddleSection";

const AutomatedEstimate = () => {
  return (
    <div className=" lg:mx-20">
      <HeroSection />
      <EstimatorProcess />
      <div>
      <Stepform />
      </div>
    </div>
  );
};

export default AutomatedEstimate;
