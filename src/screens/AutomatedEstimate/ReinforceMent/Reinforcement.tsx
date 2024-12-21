import { useEffect, useState } from "react";
import SelectInput from "./Groundbeams";
import Column from "./Column";
import Slabs from "./Slabs";
import Lintels from "./Lintel";

const options = [
  {
    label: "Ground beams",
    value: "Ground beams",
    component: (
      <div>
        <SelectInput />
      </div>
    ),
  },
  {
    label: "Suspected beams",
    value: "Suspected beams",
    component: <div className="">{/* <SelectInputtwo /> */}</div>,
  },

  {
    label: "Column",
    value: "Column",
    component: (
      <div className="">
        <Column />
      </div>
    ),
  },

  {
    label: "Slabs",
    value: "Slabs",
    component: (
      <div className="">
        <Slabs />
      </div>
    ),
  },

  {
    label: "Lintels",
    value: "Lintels",
    component: (
      <div className="">
        <Lintels />
      </div>
    ),
  },
];

export default function Reinforcement() {
  const [selectedOption, setSelectedOption] = useState("Ground beams");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);
    localStorage.setItem("Where-you-need-your-reinforcement-for", newOption);
  };

  useEffect(() => {
    const storedOption = localStorage.getItem(
      "Where-you-need-your-reinforcement-for"
    );
    if (storedOption) {
      setSelectedOption(storedOption);
    } else {
      localStorage.setItem(
        "Where-you-need-your-reinforcement-for",
        "Ground beams"
      );
    }
  }, []);

  const selectedComponent = options.find(
    (opt) => opt.value === selectedOption
  )?.component;

  return (
    <div className="flex flex-col items-center gap-3  md:w-full md:max-w-lg md:ml-20">
      {/* <h1 className="text-sm text-black w-full text-center">(a) Clearing works:</h1> */}

      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2 md:w-96"
        >
          (a) Where do you need your reinforcement for?
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
