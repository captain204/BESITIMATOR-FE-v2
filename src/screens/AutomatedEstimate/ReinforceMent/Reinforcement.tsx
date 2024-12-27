import { useEffect, useState } from "react";
import SelectInput from "./Groundbeams";
import Column from "./Column";
import Slabs from "./Slabs";
import Lintels from "./Lintel";
import { Checkbox } from "@material-tailwind/react";

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


        <div
          className="p-4  text-sm text-yellow-900  rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-blue-400 md:w-96"
          role="alert"
        >
          <span className="font-bold">Disclaimer:</span> we cannot give an
          accurate quantity of reinforcement you need, but we can on our bespoke
          subscription. Usually you need a structural engineer for your
          reinforcement requirements
        </div>
        {/* 
        <div className="flex items-center justify-start mt-2 md:w-96">
          <Checkbox color="amber" defaultChecked crossOrigin="anonymous" />
          <label htmlFor="agree" className="text-gray-700">
            Do you understand and agree to go ahead?
          </label>
        </div> */}

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
