import { useState } from "react";
import Residential from "./Residential";
// import Residential from "./Residential/Residential";
import Commercial from "../Commercial/Commercial";
import Fencing from "../Fencing/Fencing";

const options = [
  {
    label:
      "One that includes the value of the land  & cost of site and services",
    value:
      "One that includes the value of the land  & cost of site and services",
    component: <Residential />,
  },
  {
    label: "Cost of site and services alone",
    value: "Cost of site and services alone",
    component: (
      <div>
        <Commercial />
      </div>
    ),
  },
//   {
//     label: "Residential/Commercial Development",
//     value: "Residential/Commercial Development",
//     component: (
//       <div>
//         <Fencing />
//       </div>
//     ),
//   },
];

export default function LandingBanking() {
  const [selectedOption, setSelectedOption] = useState(
    "One that includes the value of the land  & cost of site and services"
  );
  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const selectedComponent = options.find(
    (opt) => opt.value === selectedOption
  )?.component;

  return (
    <div className="flex flex-col justify-center items-center   w-80  md:max-w-lg lg:ml-5 ">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2 md:w-96"
        >
          What type of development cost do you require?
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
