import React, { useEffect, useState } from "react";

const OptionOne = () => {
  const [selected, setSelected] = useState<string>("1:3");

  useEffect(() => {
    const storedOption = localStorage.getItem("1:3");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("What-is-your-plastering-mix-ratio", "1:3");
    }
  }, []);

  // Update the selected option and store it in localStorage
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("What-is-your-plastering-mix-ratio", newOption);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full max-w-2xl md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (a) What is your plastering mix ratio?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="1:3">1:3</option>
          <option value="1:4">1:4</option>
        </select>
      </div>
    </div>
  );
};

export default OptionOne;
