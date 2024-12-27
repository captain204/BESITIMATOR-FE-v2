import { useEffect, useState } from "react";
import ClearWorks from "./FirstOptionSuboptions/Clearworks/Option";
import SettingOut from "./SettingOut/SettingOut";
import Excavation from "./Excavation/Excavation";
import Fillings from "./Fillings/Fillings";
import Concrete from "./Concrete/Concrete";
import DampProving from "./DampProving/DampProving";
import Blockwork from "./Blockwork/Blockwork";
import RoofingWorks from "./RoofingWorks/RoofingWorks";
import PlateringWorks from "./PlateringWorks/PlateringWorks";
import Screeding from "./ScreedingWork/ScreedingWork";
import CeilingWork from "./CeilingWork/CeilingWork";
import PaintingWorks from "./Paintings/PaintingWorks";
import Tillings from "./Tiling/Tilings";
import Reinforcement from "./ReinforceMent/Reinforcement";
import Formwork from "./Formwork/Formwork";
import Paving from "./Paving/Paving";

const options = [
  {
    label: "Clearing Works",
    value: "Clearing Works",
    component: <ClearWorks />,
  },
  {
    label: "Setting out",
    value: "Setting out",
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
    label: "Filling works",
    value: "Filling works",
    component: (
      <div>
        <Fillings />
      </div>
    ),
  },
  {
    label: "Concrete/Binding Works",
    value: "Concrete/Binding Works",
    component: (
      <div>
        <Concrete />
      </div>
    ),
  },
  {
    label: "Damp proofing works",
    value: "Damp proofing works",
    component: (
      <div>
        <DampProving />
      </div>
    ),
  },
  {
    label: "Reinforcement/Iron bending works",
    value: "Reinforcement/Iron bending works",
    component: (
      <div>
        <Reinforcement />
      </div>
    ),
  },
  {
    label: "Formwork/Capentry works",
    value: "Formwork/Capentry works",
    component: (
      <div>
        <Formwork />
      </div>
    ),
  },
  {
    label: "Blockwork and Brickwork",
    value: "Blockwork and Brickwork",
    component: (
      <div>
        <Blockwork />
      </div>
    ),
  },
  {
    label: "Roofing works",
    value: "Roofing works",
    component: (
      <div>
        <RoofingWorks />{" "}
      </div>
    ),
  },

  {
    label: "plastering works",
    value: "plastering works",
    component: (
      <div>
        <PlateringWorks />
      </div>
    ),
  },

  {
    label: "Screeding works",
    value: "Screeding works",
    component: (
      <div>
        <Screeding />
      </div>
    ),
  },

  {
    label: "Ceiling works",
    value: "Ceiling works",
    component: (
      <div>
        <CeilingWork />
      </div>
    ),
  },

  {
    label: "Painting works",
    value: "Painting works",
    component: (
      <div>
        <PaintingWorks />
      </div>
    ),
  },

  {
    label: "Tiling/Granite Slap/Facing Brick works",
    value: "Tiling/Granite Slap/Facing Brick works",
    component: (
      <div>
        <Tillings />
      </div>
    ),
  },

  {
    label: "Paving stone Works",
    value: "Paving stone Works",
    component: <div><Paving /> </div>,
  },
];

export default function DynamicSelect() {
  const [selected, setSelected] = useState<string>("clearing");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("ItemOfWork", newOption);
  };

  useEffect(() => {
    const storedOption = localStorage.getItem("ItemOfWork");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("ItemOfWork", "Clearing Works");
    }
  }, []);

  const selectedComponent = options.find(
    (opt) => opt.value === selected
  )?.component;

  return (
    <div className="flex flex-col justify-center items-center mt-10  w-80  md:max-w-lg ">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2 md:w-96"
        >
          Which item of work do you need an approximate estimate for?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
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
