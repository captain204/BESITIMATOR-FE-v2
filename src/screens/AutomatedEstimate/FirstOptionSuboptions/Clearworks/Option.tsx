import { useState } from "react";
import SelectInput from "./Suboption";
import SelectInputtwo from "./Suboptiontwo";

const options = [
  {
    label: "No",
    value: "no",
    component: (
      <div>
        <SelectInput />
      </div>
    ),
  },
  {
    label: "Yes",
    value: "yes",
    component: (
      <div className="">
        <SelectInputtwo />
      </div>
    ),
  },
];

export default function ClearWorks() {
  const [selectedOption, setSelectedOption] = useState("no");

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const selectedComponent = options.find(
    (opt) => opt.value === selectedOption
  )?.component;

  return (
    <div className="flex flex-col items-center gap-3   mx-20">
      <h1 className="text-sm text-black w-full max-w-2xl text-center">(a) Clearing works:</h1>
      
      <select
        onChange={handleSelectChange}
        value={selectedOption}
        className=" py-4 w-96 p-1  bg-white border text-black border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="w-full max-w-md">
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
