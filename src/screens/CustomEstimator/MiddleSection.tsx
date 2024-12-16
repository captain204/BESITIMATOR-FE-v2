// components/EstimatorProcess.js
import React from "react";
import { FiArrowRight } from "react-icons/fi"; // Import arrow icon

const EstimatorProcess = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 mb-10">
      <h2 className="text-center md:text-3xl text-2xl font-bold mb-12 text-gray-800">
        Custom Building Estimator and Building Budget Calculator process
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-start">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex justify-center items-center w-20 h-20 mb-4">
            <img src="/p5.svg" alt="Work Item" className="w-16 h-16" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Select project type
          </h3>
          <p className="text-gray-600">
            Select which and what type of project you want to explore its
            costing option.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex justify-center items-center w-20 h-20 mb-4">
            <img src="/p6.svg" alt="Specifications" className="w-16 h-16" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            More detail
          </h3>
          <p className="text-gray-600">
            Put in some little more details of the project.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex justify-center items-center w-20 h-20 mb-4">
            <img src="/p7.svg" alt="About You" className="w-16 h-16" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            About You
          </h3>
          <p className="text-gray-600">Tell us a little about yourself.</p>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex justify-center items-center w-20 h-20 mb-4">
            <img src="/p4.svg" alt="Results" className="w-16 h-16" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Results</h3>
          <p className="text-gray-600">
          Get instant, free and approximate cost estimate for the project.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EstimatorProcess;
