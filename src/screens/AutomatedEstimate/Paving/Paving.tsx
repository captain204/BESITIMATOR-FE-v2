import React, { useEffect, useState } from "react";

const Paving = () => {
  const [selected, setSelected] = useState<string>("Filling with Sharp sand");

  useEffect(() => {
    const storedOption = localStorage.getItem("want-estimates-for");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("want-estimates-for", "Material only");
    }
  }, []);

  // Update the selected option and store it in localStorage
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("want-estimates-for", newOption);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full max-w-2xl md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          Do you want estimates for
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Material only">Material only?</option>
          <option value="Labour only">Labour only?</option>
          <option value="Material and labour only">
            Material and labour only?
          </option>
        </select>
      </div>
    </div>
  );
};

export default Paving;
