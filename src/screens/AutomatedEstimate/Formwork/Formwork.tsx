import { useEffect, useState } from "react";
import SelectInput from "./Groundbeams";
import Column from "./Column";
import Slabs from "./Slabs";
import Lintels from "./Lintel";
import Suspendedbeams from "./SuspendedBeam";

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
    label: "Suspended beams",
    value: "Suspended beams",
    component: <div className=""><Suspendedbeams/></div>,
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

export default function Formwork() {
  const [selected, setSelected] = useState("Ground beams");

  useEffect(() => {
      const storedOption = localStorage.getItem("Formwork/Carpentry-works")
      if (storedOption) {
        setSelected(storedOption);
      } else {
        localStorage.setItem("Formwork/Carpentry-works", "Ground beams");
      }
    }, []);
  
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newOption = event.target.value;
      setSelected(newOption);
      localStorage.setItem("Formwork/Carpentry-works", newOption);
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
          className="block text-black text-lg font-medium mb-2 md:w-96"
        >
        (a) Formwork/Carpentry works:
        </label>
        <select
          id="select-option"
          onChange={handleSelectChange}
          value={selected}
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
