import React, { useEffect, useState } from "react";

const SelectInputtwo = () => {
  const [selected, setSelected] = useState<string>("1:4");

  const [selectedtwo, setSelectedtwo] = useState<string>("38mm");

  useEffect(() => {
    const storedOption = localStorage.getItem("ratio-of-screeding");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("ratio-of-screeding", "1:4");
    }
  }, []);

  // Update the selected option and store it in localStorage
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("ratio-of-screeding", newOption);
  };

  useEffect(() => {
    const storedOption = localStorage.getItem("thickness-of-floor-screeding");
    if (storedOption) {
      setSelectedtwo(storedOption);
    } else {
      localStorage.setItem("thickness-of-floor-screeding", "38mm");
    }
  }, []);

  // Update the selected option and store it in localStorage
  const handleSelectChangetwo = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newOption = event.target.value;
    setSelectedtwo(newOption);
    localStorage.setItem("thickness-of-floor-screeding", newOption);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full mb-6 md:ml-20">
      {/* <h1 className="text-sm text-black w-full max-w-2xl text-center">
        (i) Is the land area:
      </h1> */}

      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (i) What is your screeding mix ratio?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-4 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="1:4">1:4</option>
          <option value="1:6">1:6</option>
        </select>
      </div>

      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (ii) What is the thickness of your floor screeding?
        </label>
        <select
          value={selectedtwo}
          onChange={handleSelectChangetwo}
          className="py-4 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="38mm">38mm</option>
          <option value="42mm">42mm</option>
        </select>
      </div>
    </div>
  );
};

export default SelectInputtwo;
