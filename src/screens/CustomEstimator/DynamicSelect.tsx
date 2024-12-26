import { useState } from "react";
// import Residential from "./LandingBanking/Residential";
// import Commercial from "./Commercial/Commercial";
// import Fencing from "./Fencing/Fencing";
import LandingBanking from "./LandingBanking/LandingBanking";

const options = [
  {
    label: "Land Banking Development",
    value: "Land Banking Development",
    component: <LandingBanking />,
  },
  {
    label: "Residential/Commercial Development",
    value: "Residential/Commercial Development",
    component: <div>{/* <Commercial /> */}</div>,
  },
  // {
  //   label: "Residential/Commercial Development",
  //   value: "Residential/Commercial Development",
  //   component: (
  //     <div>
  //       <Fencing />
  //     </div>
  //   ),
  // },
];

export default function DynamicSelect() {
  const [selectedOption, setSelectedOption] = useState(
    "Land Banking Development"
  );
  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const selectedComponent = options.find(
    (opt) => opt.value === selectedOption
  )?.component;

  return (
    <div className="flex flex-col justify-center items-center mt-10  w-80  md:max-w-lg ">
      <div className="">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2 md:w-96"
        >
          What type of development are you looking to do out ?
        </label>
        <select
          onChange={handleSelectChange}
          value={selectedOption}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="md:w-full w-80">
        {selectedComponent ? (
          <div className="mt-4">{selectedComponent}</div>
        ) : (
          <p className="text-center text-gray-500">
            Select an option to see its content here.
          </p>
        )}
      </div>
    </div>
  );
}
