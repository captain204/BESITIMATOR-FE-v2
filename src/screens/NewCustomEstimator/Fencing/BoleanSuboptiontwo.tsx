import React, { useState } from "react";

const BoleansuboptionTwo = () => {
  const [selected, setSelected] = useState<string>("option1");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full max-w-2xl md:ml-20 mb-3">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2 md:w-96"
        >
          (b). How many bedrooms are you looking to develop or construct:
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="1 Bedroom">1 Bedroom</option>
          <option value="2 Bedroom">2 Bedroom</option>
          <option value="3 Bedroom">3 Bedroom</option>
          <option value="4 Bedroom">4 Bedroom</option>
          <option value="5 Bedroom">5 Bedroom</option>
        </select>
      </div>
    </div>
  );
};

export default BoleansuboptionTwo;
