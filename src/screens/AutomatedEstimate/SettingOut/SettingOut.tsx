import React, { useState } from "react";

const SettingOut = () => {
  const [selected, setSelected] = useState<string>("option1");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full max-w-2xl md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-sm font-medium mb-2"
        >
          (a) What do you generally conclude is the shape of your building?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-4 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="option1">Three sided shaped</option>
          <option value="option2">Four sided shaped</option>
          <option value="option3">Circular shaped</option>
        </select>
      </div>
    </div>
  );
};

export default SettingOut;
