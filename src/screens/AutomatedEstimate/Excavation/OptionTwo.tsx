import React, { useEffect, useState } from "react";

const EOptionTwo = () => {
  const [selected, setSelected] = useState<string>("Within 10m to Disposal");

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelected(event.target.value);
  // };

  useEffect(() => {
    const storedOption = localStorage.getItem(
      "Disposal-of-Excavated-Materials"
    );
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("Disposal-of-Excavated-Materials", "Within 10m to Disposal");
    }
  }, []);

  // Update the selected option and store it in localStorage
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("Disposal-of-Excavated-Materials", newOption);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (b) Disposal of Excavated Materials:
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Within 10m to Disposal">Within 10m to Disposal</option>
          <option value="Within 10-20m to Disposal">
            Within 10-20m to Disposal
          </option>
          
        </select>
      </div>
    </div>
  );
};

export default EOptionTwo;
