import React from "react";

const ConstructionComponent = () => {
  return (
    <div className="min-h-screen bg-gray flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-8 text-start border-t-4 border-black">
        <h1 className="md:text-3xl text-2xl font-extrabold text-gray-800 mb-4 tracking-tight">
          Construction Tradesmen/Construction Vendors
        </h1>
        <p className="text-gray-600 text-lg">
          You can either register as a construction tradesmen or a construction
          vendor OR Search for a construction tradesmen or construction vendor.
          Choose an option below.
        </p>
        <div className="mt-6 flex justify-start space-x-6">
          <button className="px-8 py-2 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-800 border border-gray-500 hover:border-yellow-800 hover:text-white">
            Register
          </button>
          <button className="px-8 py-2 bg-white text-gray-700 border  border-gray-500 font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-800 hover:border-yellow-800 hover:text-white transition">
            Search
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-6xl mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            type: "Vendor",
            name: "Modeuz",
            description: "We distribute cement, binding...",
            img: "/v1.jpeg",
          },
          {
            type: "Tradesmen",
            name: "Joeslimart",
            description: "We help home and business owne...",
            img: "/v2.jpg",
          },
          {
            type: "Vendor",
            name: "AA+",
            description: "Sales and Installation of besp...",
            img: "/v3.jpg",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center border-t-4 border-black hover:border-yellow-800 transition duration-300"
          >
            <div className="w-28 h-28 mb-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full rounded-full shadow-md border-2 border-gray-300"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {item.type}
            </h3>
            <h4 className="text-lg font-semibold text-gray-700">{item.name}</h4>
            <p className="text-gray-500 text-center text-sm">
              {item.description}
            </p>
            <button className="mt-6 px-6 py-2 bg-yellow-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-purple-600 hover:to-purple-700 transition">
              Visit
            </button>
          </div>
        ))}
      </div>

      {/* More Button */}
      <div className="mt-12">
        <button className="px-10 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-gray-500 hover:to-gray-600 transition">
          More Tradesmen and Vendor
        </button>
      </div>
    </div>
  );
};

export default ConstructionComponent;
