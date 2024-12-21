import React, { useState } from "react";

const SelectInputtwo = () => {
  const [selected, setSelected] = useState<string>("option2");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full mb-6 md:ml-20">
      {/* <h1 className="text-sm text-black w-full max-w-2xl text-center">
        (i) Is the land area:
      </h1> */}

      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (i) Is the land area:
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="option1">Non-water logged/stable</option>
          <option value="option2">
            Unstable ground / slightly water logged
          </option>
          <option value="option3">Swampy/highly water logged land</option>
        </select>
      </div>
    </div>
  );
};

export default SelectInputtwo;
