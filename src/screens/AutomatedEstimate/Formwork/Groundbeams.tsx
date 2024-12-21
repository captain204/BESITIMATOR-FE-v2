import React, { useState } from "react";

const Groundbeams = () => {
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
          i(a) Ground Beams:
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Ground Beams Upstands">Ground Beams Upstands</option>
          <option value="Ground Beams footings av. Height 300mm">
            Ground Beams footings av. Height 300mm
          </option>
        </select>
      </div>
    </div>
  );
};

export default Groundbeams;
