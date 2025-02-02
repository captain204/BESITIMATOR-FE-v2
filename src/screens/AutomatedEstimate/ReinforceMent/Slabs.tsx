import React, { useEffect, useState } from "react";

const Slabs = () => {
  const [selected, setSelected] = useState<string>(
    "Slab with average thickness of 150mm"
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("Slabs-Slaps", newOption);
  };

  useEffect(() => {
    const storedOption = localStorage.getItem("Slabs-Slaps");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("Slabs-Slaps", "Slab with average thickness of 150mm");
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-3  justify-center w-full md:ml-20">
      <div className="">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (i) Slabs:
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Slab with average thickness of 150mm">
            Slab with average thickness of 150mm
          </option>
          <option value="Slab with average thickness of 200mm">
            Slab with average thickness of 200mm
          </option>
        </select>
      </div>
    </div>
  );
};

export default Slabs;
