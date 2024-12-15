import React, { useState } from 'react';

const StepTwo = () => {
  const [wallArea, setWallArea] = useState('');
  const [specificLength, setSpecificLength] = useState('');
  const [unit, setUnit] = useState('metres');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Wall Area:', wallArea);
    console.log('Specific Length:', specificLength);
    console.log('Unit of Measurement:', unit);
    alert('Form submitted! Check the console for data.');
  };

  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="max-w-2xl w-full lg:w-[50rem] bg-white p-8 shadow-md rounded-md">
        <h2 className="text-lg font-semibold mb-6 text-black">Specify your area:</h2>

        <form onSubmit={handleSubmit}>
          {/* Wall Area */}
          <div className="mb-6">
            <label htmlFor="wallArea" className="block text-black mb-1">
              Wall Area:
            </label>
            <input
              id="wallArea"
              type="number"
              placeholder="Enter wall area"
              value={wallArea}
              onChange={(e) => setWallArea(e.target.value)}
              className="w-full py-3 border text-black rounded-md px-3 focus:outline-none focus:ring-1 focus:ring-yellow-700"
            />
          </div>

          {/* Specific Length */}
          <div className="mb-6">
            <label htmlFor="specificLength" className="block text-gray-600 mb-1">
              Or{' '}
              <span className="text-yellow-900 cursor-pointer hover:underline">
                Specific Length:
              </span>
            </label>
            <input
              id="specificLength"
              type="number"
              placeholder="Enter length"
              value={specificLength}
              onChange={(e) => setSpecificLength(e.target.value)}
              className="w-full border text-black rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-700"
            />
          </div>

          {/* Unit of Measurement */}
          <div className="mb-6">
            <label htmlFor="unit" className="block text-black mb-1">
              Choose your Unit of Measurement:
            </label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full text-black border bg-white rounded-md px-3 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            >
              <option value="metres">Metres</option>
              <option value="feet">Feet</option>
              <option value="inches">Inches</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepTwo;
