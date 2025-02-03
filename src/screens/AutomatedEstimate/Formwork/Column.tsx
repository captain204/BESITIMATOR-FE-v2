import React, { useEffect, useState } from "react";

const Column = () => {
  const [selected, setSelected] = useState<string>(
    "225mm x 225mm in framed structure"
  );

  useEffect(() => {
    const storedOption = localStorage.getItem("formWorkColumnStatus");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem(
        "formWorkColumnStatus",
        "225mm x 225mm in framed structure"
      );
    }
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("formWorkColumnStatus", newOption);
  };

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
          <option value="225mm x 225mm in framed structure">
            225mm x 225mm in framed structure
          </option>
          <option value="225mm x 450mm in framed structure">
            225mm x 450mm in framed structure
          </option>
          <option value="450mm x 450mm in framed structure">
            {" "}
            450mm x 450mm in framed structure{" "}
          </option>

          <option value="225mm x 225mm in unframed structure">
            225mm x 225mm in unframed structure
          </option>

          <option value="450mm x 450mm in unframed structure">
            {" "}
            450mm x 450mm in unframed structure{" "}
          </option>

          <option value="225mm x 450mm in unframed structure">
            225mm x 450mm in unframed structure
          </option>
        </select>
      </div>
    </div>
  );
};

export default Column;
