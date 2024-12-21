import React, { useEffect, useState } from "react";

const Column = () => {
  const [selected, setSelected] = useState<string>("0.23x0.23m");

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newOption = event.target.value;
      setSelected(newOption);
      localStorage.setItem("Status-of-construction-area", newOption);
    };

  useEffect(() => {
    const storedOption = localStorage.getItem("Status-of-construction-area");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("Status-of-construction-area", "0.23x0.23m");
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-3  justify-center w-full md:ml-20">
      <div className="">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (i) Status of construction area?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="0.23x0.23m">0.23x0.23m</option>
          <option value="0.45x0.45m">0.45x0.45m</option>
          <option value="0.23x0.45m">0.23x0.45m</option>
        </select>
      </div>
    </div>
  );
};

export default Column;
