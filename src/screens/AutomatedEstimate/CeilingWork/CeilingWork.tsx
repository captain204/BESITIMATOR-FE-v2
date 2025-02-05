import { useEffect, useState } from "react";
import SelectInput from "./Suboption";

const options = [
  {
    label: "SUSPENDED CEILING (PLASTER BOARD)",
    value: "SUSPENDED CEILING (PLASTER BOARD)",
    component: (
      <div>
        <SelectInput />
      </div>
    ),
  },
  {
    label: "SUSPENDED CEILING (60 X 60CM) WITH STEEL RUNNERS",
    value: "SUSPENDED CEILING (60 X 60CM) WITH STEEL RUNNERS",
    component: <div> </div>,
  },

  {
    label: "SUSPENDED CEILING (CASTING)",
    value: "SUSPENDED CEILING (CASTING)",
    component: <div></div>,
  },
];

export default function CeilingWork() {
  const [selected, setSelected] = useState("SUSPENDED CEILING (PLASTER BOARD)");

  useEffect(() => {
    const storedOption = localStorage.getItem("Ceiling-options");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("Ceiling-options", "SUSPENDED CEILING (PLASTER BOARD)");
    }
  }, []);

  // Update the selected option and store it in localStorage
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("Ceiling-options", newOption);
  };

  const selectedComponent = options.find(
    (opt) => opt.value === selected
  )?.component;

  return (
    <div className="flex flex-col items-center gap-3  md:w-full md:max-w-lg md:ml-20">
      {/* <h1 className="text-sm text-black w-full text-center">(a) Clearing works:</h1> */}

      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (a) Ceiling Works:
        </label>
        <select
          id="select-option"
          onChange={handleSelectChange}
          value={selected}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg focus:ring-1 focus:ring-yellow-400 focus:outline-none"
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
