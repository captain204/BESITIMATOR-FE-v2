import React, { useState } from "react";

const Slabs = () => {
  const [selected, setSelected] = useState<string>("option2");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-3  justify-center w-full md:ml-20">
      <div className="">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (i) Slabs:
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Slab with average thickness of 150mm">
            Slab with average thickness of 150mm
          </option>
          <option value="0.45x0.45m">0.45x0.45m</option>
          <option value="0.23x0.45m">0.23x0.45m</option>
        </select>
      </div>
    </div>
  );
};

export default Slabs;
