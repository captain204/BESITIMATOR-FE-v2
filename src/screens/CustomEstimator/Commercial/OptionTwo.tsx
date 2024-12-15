import React, { useState } from "react";

const EOptionTwo = () => {
  const [selected, setSelected] = useState<string>("option2");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  mb-2 w-full md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          02. Level of Finishing?
        </label>
      <select
        value={selected}
        onChange={handleSelectChange}
        className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
      >
        <option value="Low-end Finishing">Low-end Finishing</option>
        <option value="Moderate/Moderate Finishing">Moderate/Moderate Finishing</option>
        <option value="High-end Finishing">High-end Finishing</option>
      </select>
      </div>
    </div>
  );
};

export default EOptionTwo;
