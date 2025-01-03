import { useEffect, useState } from "react";
import SelectInput from "./Boleansuboption";

const options = [
  {
    label: "No",
    value: "no",
    component: <div></div>,
  },
  {
    label: "Yes",
    value: "yes",
    component: (
      <div>
        {" "}
        <SelectInput />{" "}
      </div>
    ),
  },
];

export default function BooleanOption() {
  const [selectedOption, setSelectedOption] = useState("no");

  // const handleSelectChange = (event: any) => {
  //   setSelectedOption(event.target.value);
  // };

  // const selectedComponent = options.find(
  //   (opt) => opt.value === selectedOption
  // )?.component;

  useEffect(() => {
    const storedOption = localStorage.getItem(
      "Would-your-excavation-require-shoring"
    );
    if (storedOption) {
      setSelectedOption(storedOption);
    } else {
      localStorage.setItem("Would-your-excavation-require-shoring", "no");
    }
  }, []);

  // Update the selected option and store it in localStorage
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
    localStorage.setItem("Would-your-excavation-require-shoring", newOption);
  };

  const selectedComponent = options.find(
    (opt) => opt.value === selectedOption
  )?.component;

  return (
    <div className="flex flex-col items-center gap-3  md:w-full md:max-w-lg md:ml-20 mt-10">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (c) Would your excavation require shoring?
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
