import { useState } from "react";
import Fillings from "./Fillings/Fillings";
// import ClearWorks from "./FirstOptionSuboptions/Clearworks/Option";
// import SettingOut from "./SettingOut/SettingOut";
import Excavation from "./Residential/Residential";
import Residential from "./Residential/Residential";
// import Fillings from "./Fillings/Fillings";
// import Concrete from "./Concrete/Concrete";
// import DampProving from "./DampProving/DampProving";
// import Blockwork from "./Blockwork/Blockwork";
// import RoofingWorks from "./RoofingWorks/RoofingWorks";
// import PlateringWorks from "./PlateringWorks/PlateringWorks";
// import Screeding from "./ScreedingWork/ScreedingWork";
// import CeilingWork from "./CeilingWork/CeilingWork";
// import PaintingWorks from "./Paintings/PaintingWorks";
// import Tillings from "./Tiling/Tilings";

const options = [
  {
    label: "Residential Project",
    value: "Residential Project",
    component: <Residential />,
  },
  {
    label: "Commercial Project",
    value: "Commercial Project",
    component: (
      <div>
        <Excavation />
      </div>
    ),
  },
  {
    label: "Fencing Project",
    value: "Fencing Project",
    component: (
      <div>
        <Fillings />
      </div>
    ),
  },
  {
    label: "Filling works",
    value: "Filling works",
    component: (
      <div>
        <Fillings />
      </div>
    ),
  },
  {
    label: "Others",
    value: "Others",
    component: (
      <div>
        <Fillings />
      </div>
    ),
  },
  {
    label: "Damp proofing works",
    value: "Damp proofing works",
    component: (
      <div>
        <Fillings />
      </div>
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
    value: "Blockwork and Brickwork",
    component: (
      <div>
        <Fillings />
      </div>
    ),
  },
  {
    label: "Roofing works",
    value: "Roofing works",
    component: (
      <div>
        <Fillings />{" "}
      </div>
    ),
  },

  {
    label: "platering works",
    value: "platering works",
    component: (
      <div>
        <Fillings />
      </div>
    ),
  },

  {
    label: "Screeding works",
    value: "Screeding works",
    component: (
      <div>
        <Fillings />
      </div>
    ),
  },

  {
    label: "Ceiling works",
    value: "Ceiling works",
    component: (
      <div>
        <Fillings />
      </div>
    ),
  },

  {
    label: "Painting works",
    value: "Painting works",
    component: (
      <div>
        <Fillings />
      </div>
    ),
  },

  {
    label: "Tiling/Granite Slap/Facing Brick works",
    value: "Tiling/Granite Slap/Facing Brick works",
    component: (
      <div>
        <Fillings />
      </div>
    ),
  },

  {
    label: "Paving stone Works",
    value: "Paving stone Works",
    component: <div></div>,
  },
];

export default function DynamicSelect() {
  const [selectedOption, setSelectedOption] = useState("Residential Project");
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
          className="block text-black text-lg font-medium mb-2"
        >
          What type of project do you want to explore its construction costing
          option?
        </label>
        <select
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
