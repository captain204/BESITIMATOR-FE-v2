import React, { useEffect, useState } from "react";

const SelectInput = () => {
  const [selected, setSelected] = useState<string>("Smooth wall");
  

  useEffect(() => {
    const storedOption = localStorage.getItem("Wall-screeding");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("Wall-screeding", "Smooth wall");
    }
  }, []);

  // Update the selected option and store it in localStorage
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("Wall-screeding", newOption);
  };

  return (
    <div className="flex flex-col items-center gap-3  justify-center w-full md:ml-20">
     {/* <h1 className="text-sm text-black w-full max-w-2xl text-center">
        (i) What is the land area mainly composed of?
      </h1> */}
      <div className="w-full  md:max-w-2xl">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
        (i) Wall screeding (To receive paint):
        </label>
      <select
        value={selected}
        onChange={handleSelectChange}
        className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
      >
        <option value="Smooth wall">Smooth wall</option>
        <option value="Rough wall">Rough wall</option>
      </select>

      </div>
    </div>
  );
};

export default SelectInput;
