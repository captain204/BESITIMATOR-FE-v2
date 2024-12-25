"use client";

import { useState } from "react";

const ProgressSlider = () => {
  const [value, setValue] = useState(51);

  return (
    <div className="relative w-full md:w-[100%] flex justify-center items-center h-20">
      {/* Slider container */}
    
      <div className="w-full  relative">
        {/* Tooltip */}
        <div
          className="absolute -translate-y-8 transition-all duration-300 ease-in-out"
          style={{ left: `calc(${value}% - 10px)` }} // Tooltip follows slider position
        >
          <div className="bg-white shadow-lg rounded-full px-3 py-1 text-black text-sm font-medium">
            {value}%
          </div>
        </div>

        {/* Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full md:w-96 h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                     transition-all duration-300 ease-in-out
                     [&::-webkit-slider-thumb]:w-6 
                     [&::-webkit-slider-thumb]:h-6 
                     [&::-webkit-slider-thumb]:bg-black 
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:appearance-none 
                     [&::-moz-range-thumb]:w-6 
                     [&::-moz-range-thumb]:h-6 
                     [&::-moz-range-thumb]:bg-black 
                     [&::-moz-range-thumb]:rounded-full"
          style={{
            background: `linear-gradient(to right, #FBC02D ${value}%, #E5E7EB ${value}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressSlider;
