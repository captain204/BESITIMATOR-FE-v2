// components/EstimatorProcess.js
import React from "react";
import { FiArrowRight } from "react-icons/fi"; // Import arrow icon

const EstimatorProcess = () => {
  return (
    <section className="bg-gray-50 py-12 px-6 md:mb-10">
      <h2 className="text-center text-3xl font-bold mb-12 text-gray-800">
        Automated Building Estimator Process
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-start">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex justify-center items-center w-20 h-20 mb-4">
            <img src="/p1.svg" alt="Work Item" className="w-16 h-16" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Work Item
          </h3>
          <p className="text-gray-600">
            Select the work item you need estimates for.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex justify-center items-center w-20 h-20 mb-4">
            <img src="/p2.svg" alt="Specifications" className="w-16 h-16" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Specifications
          </h3>
          <p className="text-gray-600">
            Input the total length, area, or cubic meter for the work item you
            need an estimate for.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex justify-center items-center w-20 h-20 mb-4">
            <img src="/p3.svg" alt="About You" className="w-16 h-16" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            About You
          </h3>
          <p className="text-gray-600">
            Input basic information about yourself.
          </p>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center text-center">
          <div className="flex justify-center items-center w-20 h-20 mb-4">
            <img src="/p4.svg" alt="Results" className="w-16 h-16" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Results</h3>
          <p className="text-gray-600">
            Get estimated material and labor requirements for your work item.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EstimatorProcess;
