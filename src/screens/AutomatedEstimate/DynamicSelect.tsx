import { useState } from "react";
import ClearWorks from "./FirstOptionSuboptions/Clearworks/Option";
import SettingOut from "./SettingOut/SettingOut";
import Excavation from "./Excavation/Excavation";

const options = [
  {
    label: "Clearing Works",
    value: "clearing",
    component: <ClearWorks />,
  },
  {
    label: "Setting out",
    value: "setting",
    component: (
      <div>
        <SettingOut />
      </div>
    ),
  },
  {
    label: "Excavation",
    value: "Excavation",
    component: (
      <div>
        <Excavation />
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
  const [selectedOption, setSelectedOption] = useState("clearing");
  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const selectedComponent = options.find(
    (opt) => opt.value === selectedOption
  )?.component;

  return (
    <div className="flex flex-col justify-center items-center mt-10  w-80  md:max-w-lg ">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-sm font-medium mb-2"
        >
          Which item of work do you need an approximate estimate for?
        </label>
        <select
          onChange={handleSelectChange}
          value={selectedOption}
          className="py-4 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
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

