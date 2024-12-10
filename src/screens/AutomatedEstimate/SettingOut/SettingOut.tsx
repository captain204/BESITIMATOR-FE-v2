import React, { useState } from "react";

const SettingOut = () => {
  const [selected, setSelected] = useState<string>("option2");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full">
      <h1 className="text-sm text-black w-full max-w-2xl text-center">
        (a) What do you generally conclude is the shape of your building?
      </h1>
      <select
        value={selected}
        onChange={handleSelectChange}
        className="py-4 w-96 p-1 bg-white border text-black border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
      >
        <option value="option1">Three sided shaped</option>
        <option value="option2">Four sided shaped</option>
        <option value="option3">Circular shaped</option>
      </select>
    </div>
  );
};

export default SettingOut;
