import React, { useState } from "react";

const SizeGate = () => {
  const [selected, setSelected] = useState<string>("option2");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mb-2 md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2 md:w-96"
        >
          03. What size of gate house are you looking to construct?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Gate House Only with steel Gate (Ground floor only)">
            Gate House Only with steel Gate (Ground floor only)
          </option>
          <option value="Gate House with steel gate, Gate columns & Beams above drive way ">
            Gate House with steel gate, Gate columns & Beams above drive way{" "}
          </option>
          <option value="Gate House with steel gate, Lounge and other ancillary buildings with gate">
            Gate House with steel gate, Lounge and other ancillary buildings
            with gate
          </option>

          <option value="columns & Beams above drive way (GFA app 50m2)">
            columns & Beams above drive way (GFA app 50m2)
          </option>
        </select>
      </div>
    </div>
  );
};

export default SizeGate;
