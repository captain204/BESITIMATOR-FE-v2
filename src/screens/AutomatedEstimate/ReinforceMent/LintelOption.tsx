import React, { useState } from "react";

const LintelOption = () => {
  const [selected, setSelected] = useState<string>("in situ casted (width 225mm");

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelected(event.target.value);
  // };


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newOption = event.target.value;
      setSelected(newOption);
      localStorage.setItem("Lintel-reinforcement-option", newOption);
    };

  return (
    <div className="flex flex-col items-center gap-3  justify-center w-full md:ml-20">
      <div className="">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          Reinforcement:
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="in situ casted (width 225mm)">
            in situ casted (width 225mm)
          </option>
          <option value="in situ casted (width 150mm)">
            in situ casted (width 150mm)
          </option>
          <option value="in situ casted (width 225mm)">
            {" "}
            in situ casted (width 225mm)
          </option>

          <option value="  in situ casted (width 150mm)">
            {" "}
            in situ casted (width 150mm)
          </option>
        </select>
      </div>
    </div>
  );
};

export default LintelOption;
