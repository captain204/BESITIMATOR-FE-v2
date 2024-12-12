import React, { useState } from "react";

const EOptionTwo = () => {
  const [selected, setSelected] = useState<string>("option2");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full md:ml-20">
      <div>
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (b) What type of concrete mix do you intend to use?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Grade M7.5(1:4:8)">Grade M7.5(1:4:8)</option>
          <option value="Grade M10(1:3:6)">Grade M10(1:3:6)</option>
          <option value="Grade M10(1:2:4)">Grade M10(1:2:4)</option>
          <option value="Grade M10(1:1:5:3)">Grade M10(1:1:5:3)</option>
          <option value="Grade M10(1:1:2)">Grade M10(1:1:2)</option>
        </select>
      </div>
    </div>
  );
};

export default EOptionTwo;
