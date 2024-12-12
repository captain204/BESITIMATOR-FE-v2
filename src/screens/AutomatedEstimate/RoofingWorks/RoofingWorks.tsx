import React, { useState } from "react";

const RoofingWorks = () => {
  const [selected, setSelected] = useState<string>("option1");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full max-w-2xl md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
         (a) What type of roof is to be used in your building ?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-4 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Gable roof">Gable roof</option>
          <option value="Hip roof">Hip roof</option>
          <option value="Flat roof">Flat roof</option>
        </select>
      </div>
    </div>
  );
};

export default RoofingWorks;
