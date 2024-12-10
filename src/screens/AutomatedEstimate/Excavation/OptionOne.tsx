import React, { useState } from "react";

const EOptionOne = () => {
  const [selected, setSelected] = useState<string>("option2");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full mb-6">
      <h1 className="text-sm text-black w-full max-w-2xl text-center">
      (a)  Excavation in:?
      </h1>
      <select
        value={selected}
        onChange={handleSelectChange}
        className="py-4 w-96 p-1 bg-white border text-black border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
      >
        <option value="option1">Rocky areas</option>
        <option value="option2">Moderate rocky areas</option>
        <option value="option3">Non-Rocky areas </option>
      </select>
    </div>
  );
};

export default EOptionOne;
