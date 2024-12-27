import React from "react";
import HeroSection from "./Hero";
import CardGrid from "./InventoryCards";

const Inventory = () => {
  return (
    <div className="lg:mx-20">
      <HeroSection />
      <CardGrid />
    </div>
  );
};

export default Inventory;
