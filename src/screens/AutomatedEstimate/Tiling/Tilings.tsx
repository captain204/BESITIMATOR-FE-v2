import React, { useState } from "react";

const Tillings = () => {
  const [selected, setSelected] = useState<string>("option1");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full max-w-2xl md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (a) What finish do you intend to use?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value=" Wall Tiles">Wall Tiles</option>
          <option value="Floor Tiles">Floor Tiles</option>
          <option value=" Granite Slab">Granite Slab</option>
          <option value="Facing bricks">Facing bricks</option>
          <option value="Parquet/Wooden floor">Parquet/Wooden floor</option>
        </select>
      </div>
    </div>
  );
};

export default Tillings ;
