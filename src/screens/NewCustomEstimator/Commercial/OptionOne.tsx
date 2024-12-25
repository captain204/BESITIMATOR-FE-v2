import React, { useState } from "react";

const SelectInput = () => {
  const [value, setValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-3 justify-center w-full md:ml-20 mb-2">
      <div className="w-full">
        <label
          htmlFor="length-input"
          className="block text-black text-lg font-medium mb-2"
        >
          {/* (a). Please input area (m<sup>2</sup>) */}
          01. What is the G.F.A (Gross Floor Area m<sup>2</sup>) of the proposed
          Building?
        </label>
        <input
          id="length-input"
          type="number"
          value={value}
          onChange={handleInputChange}
          placeholder="Ex-2000"
          className="py-3 w-full md:w-96 px-3 bg-white border text-black border-gray-300 rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SelectInput;
