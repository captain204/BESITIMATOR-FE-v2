import React, { useEffect, useState } from "react";

const Column = () => {
  const [selected, setSelected] = useState<string>("225mm x225mm column sizes");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("Status-of-construction-area-column", newOption);
  };

  useEffect(() => {
    const storedOption = localStorage.getItem(
      "Status-of-construction-area-column"
    );
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem(
        "Status-of-construction-area-column",
        "225mm x225mm column sizes"
      );
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-3  justify-center w-full md:ml-20">
      <div className="">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (i) Status of construction area?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="225mm x225mm column sizes">
            225mm x 225mm column sizes
          </option>
          <option value="225mm x 450mm column sizes">
            225mm x 450mm column sizes
          </option>
          <option value="450mm x 450mm column sizes">
            450mm x 450mm column sizes
          </option>
        </select>
      </div>
    </div>
  );
};

export default Column;
