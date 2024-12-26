import React, { useEffect, useState } from "react";

const DampProving = () => {
  const [selected, setSelected] = useState<string>("Damp prove course");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("Damp-proofing-works", newOption);
  };

  useEffect(() => {
    const storedOption = localStorage.getItem("Damp-proofing-works");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("Damp-proofing-works", "Damp prove course");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full max-w-2xl md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (a) Damp proofing works:
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Damp prove course">Damp prove course</option>
          <option value="Damp prove membrane">Damp prove membrane</option>
        </select>
      </div>
    </div>
  );
};

export default DampProving;
