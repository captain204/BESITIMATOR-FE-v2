import { useState } from "react";
import ClearWorks from "./FirstOptionSuboptions/Clearworks/ClearWork";

const options = [
  {
    label: "Clearing Works",
    value: "manual",
    component: (
       <ClearWorks />
    ),
  },
  {
    label: "Setting out",
    value: "mwchanical",
    component: (
      <div className="p-4 bg-green-100 rounded-md">
        This is Option 2 content.
      </div>
    ),
  },
  {
    label: "Excavation",
    value: "Excavation",
    component: (
      <div className="p-4 bg-yellow-100 rounded-md">
        Option 3 is rendered here!
      </div>
    ),
  },
  {
    label: "filling works",
    value: "option4",
    component: (
      <div className="p-4 bg-red-100 rounded-md">Here comes Option 4!</div>
    ),
  },
  {
    label: "Concrete/Binding Works",
    value: "option5",
    component: (
      <div className="p-4 bg-purple-100 rounded-md">Content for Option 5.</div>
    ),
  },
  {
    label: "Damp proofing works",
    value: "option6",
    component: (
      <div className="p-4 bg-teal-100 rounded-md">Option 6 in action!</div>
    ),
  },
  {
    label: "Reinforcement/Iron bending works",
    value: "option7",
    component: (
      <div className="p-4 bg-pink-100 rounded-md">
        Option 7 displayed below.
      </div>
    ),
  },
  {
    label: "Formwork/Capentry works",
    value: "option8",
    component: (
      <div className="p-4 bg-gray-100 rounded-md">
        Dynamic content for Option 8.
      </div>
    ),
  },
  {
    label: "Blockwork and Brickwork",
    value: "option9",
    component: (
      <div className="p-4 bg-indigo-100 rounded-md">Rendering Option 9.</div>
    ),
  },
  {
    label: "Roofing works",
    value: "option10",
    component: (
      <div className="p-4 bg-orange-100 rounded-md">And here is Option 10!</div>
    ),
  },

  {
    label: "platering works",
    value: "option10",
    component: (
      <div className="p-4 bg-orange-100 rounded-md">And here is Option 11!</div>
    ),
  },

  {
    label: "Seeding works",
    value: "option10",
    component: (
      <div className="p-4 bg-orange-100 rounded-md">And here is Option 12!</div>
    ),
  },

  {
    label: "Ceiling works",
    value: "option10",
    component: (
      <div className="p-4 bg-orange-100 rounded-md">And here is Option 13!</div>
    ),
  },

  {
    label: "Painting works",
    value: "option10",
    component: (
      <div className="p-4 bg-orange-100 rounded-md">And here is Option 13!</div>
    ),
  },
];

export default function DynamicSelect() {
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
        Which item of work do you need an approximate estimate for?
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
