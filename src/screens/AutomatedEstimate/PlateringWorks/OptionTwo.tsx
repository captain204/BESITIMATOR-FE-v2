import React, { useEffect, useState } from "react";

const OptionTwo = () => {
  const [selected, setSelected] = useState<string>("12mm");

  useEffect(() => {
    const storedOption = localStorage.getItem("What-is-the-thickness-of-your-plastering");
    if (storedOption) {
      setSelected(storedOption);
    } else {
      localStorage.setItem("What-is-the-thickness-of-your-plastering", "12mm");
    }
  }, []);

  // Update the selected option and store it in localStorage
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;
    setSelected(newOption);
    localStorage.setItem("What-is-the-thickness-of-your-plastering", newOption);
  };

  return (
    <div className="flex flex-col items-center justify-center  gap-3  w-full max-w-2xl md:ml-20">
      <div className="w-full">
        <label
          htmlFor="select-option"
          className="block text-black text-lg font-medium mb-2"
        >
          (a) What is the thickness of your plastering?
        </label>
        <select
          value={selected}
          onChange={handleSelectChange}
          className="py-3 w-full md:w-96 p-1 bg-white border text-black border-gray-300 rounded-lg  focus:ring-1 focus:ring-yellow-400 focus:outline-none"
        >
          <option value="12mm">12mm</option>
          <option value="15mm">15mm</option>
          <option value="20mm">20mm</option>
        </select>
      </div>

      <div
        className="md:ml-16  mt-5  p-4 mb-4 text-sm text-blue-800 md:  rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 md:w-96"
        role="alert"
      >
        <span className="font-bold">Disclaimer:</span> It is important to deduct
        all openings ( like windows, doors etc.) before inputting the area of
        the blockwork/Claypot material and labour schedule required.
      </div>
    </div>
  );
};

export default OptionTwo;
