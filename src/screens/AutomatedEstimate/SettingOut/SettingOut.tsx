import React, { useEffect, useState } from "react";

const SettingOut = () => {
  const [selected, setSelected] = useState<string>("Three sided shaped like triangle, scalene etc");

  useEffect(() => {
    const storedOption = localStorage.getItem("ShapeOfBuilding");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("ShapeOfBuilding", "Three sided shaped like triangle, scalene etc");
    }
  }, []);

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelected(event.target.value);
  // };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("ShapeOfBuilding", newOption);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full max-w-2xl md:ml-20">
      <div className="">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2 md:w-96"
        >
          (a) What do you generally conclude is the shape of your building?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Three sided shaped like triangle, scalene etc">Three sided shaped like triangle, scalene etc</option>
          <option value="Four sided shaped like square, rectangle etc">Four sided shaped like square, rectangle etc</option>
          <option value="Circular shaped">Circular shaped</option>
        </select>
      </div>
    </div>
  );
};

export default SettingOut;
