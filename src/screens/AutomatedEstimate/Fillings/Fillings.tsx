import React, { useEffect, useState } from "react";

const Fillings = () => {
  const [selected, setSelected] = useState<string>("Filling with Sharp sand");

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelected(event.target.value);
  // };

    useEffect(() => {
      const storedOption = localStorage.getItem("Filling-works");
      if (storedOption) {
        setSelected(storedOption);
      } else {
        localStorage.setItem("Filling-works", "Filling with Sharp sand");
      }
    }, []);
  
    // Update the selected option and store it in localStorage
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newOption = event.target.value;
      setSelected(newOption);
      localStorage.setItem("Filling-works", newOption);
    };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full max-w-2xl md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (i) Filling works:
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Filling with Sharp sand">
            Filling with Sharp sand
          </option>
          <option value="Filling with Sharp sand">
            Filling with Sharp sand
          </option>
          <option value="Filling with Laterite filling sand">
            Filling with Laterite filling sand
          </option>
          <option value="Filling with Hardcore">Filling with Hardcore</option>
          <option value="Filling with Rubbles">Filling with Rubbles</option>
          <option value="Filling with Stone base">
            Filling with Stone base
          </option>
          <option value="Levelling and compacting">
            Levelling and compacting
          </option>
        </select>
      </div>
    </div>
  );
};

export default Fillings;
