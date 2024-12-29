"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "./Hero";
import MaterialPriceTap from "./MaterialpriceTap";
import { MdCancel } from "react-icons/md";

const PriceList = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show the modal immediately after component mounts
    setShowModal(true);
  }, []);

  return (
    <div className="relative">
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-yellow-100 p-8 rounded-lg shadow-2xl max-w-2xl w-full relative">
            {/* Cancel Icon */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <MdCancel className="h-8 w-8 text-yellow-700" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-6">
                {/* <img
                  src="/building-estimator-logo.png"
                  alt="The Building Estimator"
                  className="w-14 h-14"
                /> */}
                <h2 className="text-2xl font-bold ml-3 text-black">
                Applicable Material-Labour Price
                </h2>
              </div>
              <p className="text-black  mb-6 leading-relaxed font-extrabold text-lg">
                These material price lists and labour rates are applicable for
                whatever project you are handling. Although, it is always
                advised to re-negotiate below the applicable suggested price in
                this pricelist/rates to get a better deal.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="bg-yellow-800 text-white px-20 py-2 rounded-md shadow  focus:outline-none"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      <HeroSection />
      <MaterialPriceTap />
    </div>
  );
};

export default PriceList;
