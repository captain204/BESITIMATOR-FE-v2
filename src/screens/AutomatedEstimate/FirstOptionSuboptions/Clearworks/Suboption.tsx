import React, { useEffect, useState } from "react";

const SelectInput = () => {
  const [selected, setSelected] = useState<string>("Grasses and Shrubs");

  

  useEffect(() => {
    const storedOption = localStorage.getItem("landAreaComposition");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("landAreaComposition", "Grasses and Shrubs");
    }
  }, []);




  // Update selected option and store it in localStorage
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("landAreaComposition", newOption);
  };

  return (
    <div className="flex flex-col items-center gap-3 justify-center w-full md:ml-20">
      <div className="">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (i) What is the land area mainly composed of?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="Grasses and Shrubs">Grasses and Shrubs</option>
          <option value="Grasses, Shrubs and trees">
            Grasses, Shrubs and trees
          </option>
        </select>
      </div>
    </div>
  );
};

export default SelectInput;

// import React, { useState } from "react";

// const SelectInput = () => {
//   const [selected, setSelected] = useState<string>("option2");

//   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelected(event.target.value);
//   };

//   return (
//     <div className="flex flex-col items-center gap-3  justify-center w-full md:ml-20">

//       <div className="">
//         <label
//           htmlFor="select-option"
//           className="block text-black text-lg font-medium mb-2"
//         >
//         (i) What is the land area mainly composed of?
//         </label>
//       <select
//         value={selected}
//         onChange={handleSelectChange}
//         className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
//       >
//         <option value="option1">Grasses and Shrubs</option>
//         <option value="option2">Grasses, Shrubs and trees</option>
//       </select>

//       </div>
//     </div>
//   );
// };

// export default SelectInput;
