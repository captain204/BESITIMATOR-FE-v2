import React, { useState, useEffect } from "react";

const Blockwork = () => {
  const [selected, setSelected] = useState<string>('225mm Blockwork(9")');

  // Store default value in localStorage on page load
  useEffect(() => {
    const storedOption = localStorage.getItem("Blockwork-and-Brickwork");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("Blockwork-and-Brickwork", '225mm Blockwork(9")');
    }
  }, []);

  // Update the selected option and store it in localStorage
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("Blockwork-and-Brickwork", newOption);
  };

  return (
    <>
      {/* <div
        className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 md:w-96"
        role="alert"
      >
        <span className="font-bold">Disclaimer:</span> It is important to deduct
        all openings (like windows, doors etc.) before inputting the area of the
        blockwork/Claypot material and labour schedule required.
      </div> */}

      <div
        className="p-4  text-sm text-yellow-900  rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-blue-400 md:w-96"
        role="alert"
      >
        <span className="font-bold">Disclaimer:</span> It is important to deduct
        all openings (like windows, doors etc.) before inputting the area of the
        blockwork/Claypot material and labour schedule required.
      </div>

      <div className="flex items-center me-4 py-3">
        <div className="inline-flex items-center">
          <label className="flex items-center cursor-pointer relative">
            <input
              type="checkbox"
              // defaultChecked
              className="peer h-4 w-4 cursor-pointer transition-all appearance-none  rounded shadow hover:shadow-md border border-slate-300 checked:bg-amber-600 checked:border-amber-600"
              id="check3"
            />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </label>
        </div>

        <label
          htmlFor="yellow-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Do you understand and agree to go ahead?
        </label>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 w-full max-w-2xl md:ml-20">
        <div className="w-full">
          <label
            htmlFor="select-option"
            className="block text-black text-lg font-medium mb-2"
          >
            (a) Blockwork and Brickwork:
          </label>
          <select
            value={selected}
            onChange={handleSelectChange}
            className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
          >
            <option value='225mm Blockwork(9")'>225mm Blockwork(9")</option>
            <option value='150mm Blockwork(6")'>150mm Blockwork(6")</option>
            <option value="457mm X 205mm Hollow Clay pot">
              457mm X 205mm Hollow Clay pot
            </option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Blockwork;

// import React, { useState } from "react";

// const Blockwork = () => {
//   const [selected, setSelected] = useState<string>("option1");

//   const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelected(event.target.value);
//   };

//   return (
//     <>
//       <div
//         className="p-4 mb-4 text-sm text-blue-800  rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 md:w-96"
//         role="alert"
//       >
//         <span className="font-bold">Disclaimer:</span> It is important to deduct
//         all openings ( like windows, doors etc.) before inputting the area of
//         the blockwork/Claypot material and labour schedule required.
//       </div>

//       <div className="flex flex-col items-center justify-center  gap-3  w-full max-w-2xl md:ml-20">
//         <div className="w-full">
//           <label
//             htmlFor="select-option"
//             className="block text-black text-lg font-medium mb-2"
//           >
//             (a) Blockwork and Brickwork:
//           </label>
//           <select
//             value={selected}
//             onChange={handleSelectChange}
//             className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
//           >
//             <option value='225mm Blockwork(9")'>225mm Blockwork(9")</option>
//             <option value='150mm Blockwork(6")'>150mm Blockwork(6")</option>
//             <option value="457mm X 205mm Hollow Clay pot">
//               457mm X 205mm Hollow Clay pot
//             </option>
//           </select>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Blockwork;
