import React, { useEffect, useState } from "react";

const Suspendedbeams = () => {
  const [selected, setSelected] = useState<string>(
    "framed structure av. Height 300mm"
  );

  useEffect(() => {
    const storedOption = localStorage.getItem("Suspended-beams-formework");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem(
        "Suspended-beams-formework",
        "framed structure av. Height 300mm"
      );
    }
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("Suspended-beams-formework", newOption);
  };

  return (
    <div className="flex flex-col items-center gap-3  justify-center w-full md:ml-20">
      <div className="">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          i(a) Suspended beams in:
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="framed structure av. Height 300mm">
            framed structure av. Height 300mm
          </option>
          <option value="unframed structure av. Height 300mm">
            framed structure av. Height 300mm
          </option>
        </select>
      </div>
    </div>
  );
};

export default Suspendedbeams;
