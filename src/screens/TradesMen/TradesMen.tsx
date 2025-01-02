import React from "react";
import HeroSection from "./Hero";
import ConstructionComponent from "./Construction";
import ConstructionForm from "./Register";

const TradesMen = () => {
  return (
    <div className="lg:mx-20">
      <HeroSection />
      <ConstructionComponent />
      <ConstructionForm />
    </div>
  );
};

export default TradesMen;
