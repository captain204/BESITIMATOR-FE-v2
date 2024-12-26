import React, { useState } from "react";
import ProgressSlider from "./Slidder";

const ROptionTwo = () => {
  const [selected, setSelected] = useState<string>("option2");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2 md:w-96"
        >
          03. What type of foundation is likely to be used for this fence work?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Raft Foundation (Aprox 1m High)">
            Raft Foundation (Aprox 1m High)
          </option>
          <option value="option2">Strip Foundation (Aprox 1m High)</option>
        </select>
      </div>
      <div className="w-full">
        {" "}
        <h1 className="text-black md:w-96 text-lg">
        04. How Much percentage will you like to provide to cater for preliminaries
        </h1>
        <ProgressSlider />
      </div>
    </div>
  );
};

export default ROptionTwo;