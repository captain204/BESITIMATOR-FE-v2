import { useState } from "react";
// import SelectInput from "../Residential/Boleansuboption";
// import BoleansuboptionTwo from "../Residential/BoleanSuboptiontwo";
// import YesOption from "./Yes";
// import YestwoOption from "./Yestwo";
import YesThreeOption from "./YesThree";

const options = [
  {
    label: "No",
    value: "No",
    component: <div> {/* <BoleansuboptionTwo /> */}</div>,
  },
  {
    label: "Yes",
    value: "Yes",
    component: (
      <div>
        {" "}
        <YesThreeOption />{" "}
      </div>
    ),
  },
];

export default function Fifth() {
  const [selectedOption, setSelectedOption] = useState("No");

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const selectedComponent = options.find(
    (opt) => opt.value === selectedOption
  )?.component;

  return (
    <div className="flex flex-col items-center   md:w-full md:max-w-lg md:ml-20  ">
      {/* <h1 className="text-sm text-black w-full text-center">(a) Clearing works:</h1> */}

      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg  font-medium mb-2 md:w-96 pt-2"
        >
          05.Do you know the length of the drainage Line ?
        </label>
        <select
          id="select-option"
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
