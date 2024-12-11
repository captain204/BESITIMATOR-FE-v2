import React, { useState } from "react";

const SelectInputtwo = () => {
  const [selected, setSelected] = useState<string>("option2");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full  gap-3">
     <h1 className="text-sm text-black w-full max-w-2xl text-center">
        (i) Is the land area:
      </h1>
      <select
        value={selected}
        onChange={handleSelectChange}
        className="py-4 w-96 p-1 bg-white border text-black border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
      >
        <option value="option1">Non-water logged/stable</option>
        <option value="option2">Unstable ground / slightly water logged</option>
        <option value="option3">Swampy/highly water logged land</option>
      </select>
    </div>
  );
};

export default SelectInputtwo;
