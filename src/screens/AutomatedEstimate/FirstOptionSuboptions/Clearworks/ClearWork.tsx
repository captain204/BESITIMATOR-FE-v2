import { useState } from "react";

const options = [
  {
    label: "Manual",
    value: "clearing works",
    component: (
      <div className="p-4 bg-blue-100 rounded-md">You selected Option 1!</div>
    ),
  },
  {
    label: "Mechanical",
    value: "Setting Out",
    component: (
      <div className="p-4 bg-green-100 rounded-md">
        This is Option 2 content.
      </div>
    ),
  },
];

export default function ClearWorks() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const selectedComponent = options.find(
    (opt) => opt.value === selectedOption
  )?.component;

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-r min-h-auto mx-20">
      <h1 className="text-2xl font-bold text-black text-center">
      (a) Clearing works:
      </h1>
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
