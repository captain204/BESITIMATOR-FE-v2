import React from "react";
import HeroSection from "./Hero";
import MaterialPriceTap from "./MaterialpriceTap";

const PriceList = () => {
  return (
    <div className="lg:mx-20">
      <HeroSection />

      <MaterialPriceTap />

      {/* <PriceTable /> */}
    </div>
  );
};

export default PriceList;
