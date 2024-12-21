import React, { useEffect, useState } from "react";

const RoofingWorks = () => {
  const [selected, setSelected] = useState<string>("Gable roof");

  useEffect(() => {
    const storedOption = localStorage.getItem("What-type-of-roof");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("What-type-of-roof", "Gable roof");
    }
  }, []);

  // Update the selected option and store it in localStorage
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("What-type-of-roof", newOption);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full max-w-2xl md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (a) What type of roof is to be used in your building ?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Gable roof">Gable roof</option>
          <option value="Hip roof">Hip roof</option>
          <option value="Flat roof">Flat roof</option>
        </select>
      </div>
    </div>
  );
};

export default RoofingWorks;
