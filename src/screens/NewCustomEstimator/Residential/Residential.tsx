import React from "react";
import EOptionOne from "./OptionOne";
import EOptionTwo from "./OptionTwo";
import BooleanOption from "./BooleanOption";
import ROptionTwo from "./OptionThree";



const Residential = () => {
  return (
    <div>
      <BooleanOption />
      <EOptionOne />
      <EOptionTwo />
      <ROptionTwo />
      {/* <SliderComponent /> */}
     
      {/* <ProgressSlider /> */}
    </div>
  );
};

export default Residential;
