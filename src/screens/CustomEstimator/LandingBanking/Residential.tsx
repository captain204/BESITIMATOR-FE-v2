import React from "react";
import EOptionTwo from "./FouthOption";
import BooleanOption from "./BooleanOption";
// import ROptionTwo from "./FifthOption";
import InputOptionOne from "./InputOptionOne";
import SizeGate from "./SizeOfGateOption";
import SixthOption from "./SixthOption";
// import Sixth from "./Fifth";
import Fifth from "./Fifth";
import ProgressSlider from "../Commercial/Slidder";

const Residential = () => {
  return (
    <div>
      <InputOptionOne />
      <BooleanOption />
      <SizeGate />

      <EOptionTwo />
      <Fifth />
      <SixthOption />
      {/* <SliderComponent />  */}

      <ProgressSlider />
    </div>
  );
};

export default Residential;
