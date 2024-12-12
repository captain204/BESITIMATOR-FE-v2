import React, { useState } from "react";

const EOptionOne = () => {
  const [selected, setSelected] = useState<string>("option2");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full mb-6 md:ml-20">
      <div className="">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (a) What area do you require concrete for?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="To receive concrete">To receive concrete</option>
          <option value="To make good working surface">
            To make good working surface
          </option>
          <option value="Beams">Beams</option>
          <option value="Column">Column</option>
          <option value="Slabs">Slabs</option>
          <option value="Staircase">Staircase</option>
        </select>
      </div>
    </div>
  );
};

export default EOptionOne;
