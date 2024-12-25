import React, { useState } from "react";

const YesOption = () => {
  const [selected, setSelected] = useState<string>("option2");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mb-2 md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          How do you intend to clear ?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Strip Foundation">Manual Clearing </option>
          <option value="Raft Foundation">
            Mechanical Clearing - eg Bulldozer
          </option>
          {/* <option value="Pile Foundation">Pile Foundation</option> */}
        </select>
      </div>
    </div>
  );
};

export default YesOption;
