import React, { useEffect, useState } from "react";

const EOptionOne = () => {
  const [selected, setSelected] = useState<string>("Rocky areas");

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelected(event.target.value);
  // };

  useEffect(() => {
    const storedOption = localStorage.getItem("excavation-in");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("excavation-in", "Rocky areas");
    }
  }, []);

  // Update the selected option and store it in localStorage
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("excavation-in", newOption);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full mb-6 md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (a)Excavation in:?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Rocky areas">Rocky areas</option>
          <option value="Moderate rocky areas">Moderate rocky areas</option>
          <option value="Non-Rocky areas ">Non-Rocky areas </option>
        </select>
      </div>
    </div>
  );
};

export default EOptionOne;
