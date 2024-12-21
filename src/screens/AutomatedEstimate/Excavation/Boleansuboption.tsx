import React, { useEffect, useState } from "react";

const SelectInput = () => {
  const [value, setValue] = useState<string>(
    localStorage.getItem("length-to-be-shored") || ""
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    localStorage.setItem("length-to-be-shored", value);
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-3 justify-center w-full md:ml-20">
      <div>
        <label
          htmlFor="length-input"
          className="block text-black text-lg font-medium mb-2"
        >
          Length to be shored (m):
        </label>
        <input
          id="length-input"
          type="number"
          value={value}
          onChange={handleInputChange}
          placeholder="Enter length in meters"
          className="py-3 w-full md:w-96 px-3 bg-white border text-black border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SelectInput;
