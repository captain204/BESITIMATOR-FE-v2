import React, { useState } from "react";
import ProgressSlider from "./Slidder";

const ROptionTwo = () => {
  const [selected, setSelected] = useState<string>("option2");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3 mt-2  w-full md:ml-20">
      <div className="w-full">
        {" "}
        <h1 className="text-black md:w-96 text-lg">03. Complexity of Build</h1>
        <ProgressSlider />
      </div>
    </div>
  );
};

export default ROptionTwo;
