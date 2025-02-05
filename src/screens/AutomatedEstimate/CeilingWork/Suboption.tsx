import React, { useEffect, useState } from "react";

const SelectInput = () => {
  const [selected, setSelected] = useState<string>("option2");


    useEffect(() => {
      const storedOption = localStorage.getItem(
        "Suspended-sizes"
      );
      if (storedOption) {
        setSelected(storedOption);
      } else {
        localStorage.setItem(
          "Suspended-sizes",
          "To receive concrete"
        );
      }
    }, []);
  
    // Update the selected option and store it in localStorage
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newOption = event.target.value;
      setSelected(newOption);
      localStorage.setItem("Suspended-sizes", newOption);
    }

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
        (i) POP Suspended ceiling with Gypsum board:
        </label>
      <select
        value={selected}
        onChange={handleSelectChange}
        className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
      >
        <option value="3m x 1.2m x 12mm or 10mm">3m x 1.2m x 12mm or 10mm</option>
        <option value="2.4m x 1.2m x 12mm or 10mm">2.4m x 1.2m x 12mm or 10mm</option>
        <option value="2.5m x 1.2m x 12mm or 10mm">2.5m x 1.2m x 12mm or 10mm</option>
      </select>

      </div>
    </div>
  );
};

export default SelectInput;
