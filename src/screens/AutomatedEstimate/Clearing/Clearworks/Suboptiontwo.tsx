import React, { useEffect, useState } from "react";

const SelectInputtwo = () => {
  const [selected, setSelected] = useState<string>("Water logged");

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelected(event.target.value);
  // };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("IsTheLandArea", newOption);
  };

  useEffect(() => {
    const storedOption = localStorage.getItem("IsTheLandArea");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("IsTheLandArea", "Water logged");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full mb-6 md:ml-20">
      {/* <h1 className="text-sm text-black w-full max-w-2xl text-center">
        (i) Is the land area:
      </h1> */}

      <div className="w-full">
        <div
          className="p-4 mb-4 text-sm text-yellow-900 rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-blue-400 md:w-96"
          role="alert"
        >
          Mechanical – can be used if plots exceed more than 6plots. If less
          than 6plots please choose the manual option.
        </div>
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (i) Is the land area;
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Water logged">Water logged </option>
          <option value="Non-Water logged">Non-Water logged</option>
          {/* <option value="Swampy/highly water logged land">Swampy/highly water logged land</option> */}
        </select>
      </div>
    </div>
  );
};

export default SelectInputtwo;
