"use client"
import React, { useState } from "react";
import Header from "./Header";

const ConstructionComponent = () => {
  const [showAll, setShowAll] = useState(false);

  const cards = [
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
    {
      type: "Tradesmen",
      name: "BuildPro",
      description: "Expert in construction and renov...",
      img: "/v4.jpeg",
    },
    {
      type: "Vendor",
      name: "CraftCo",
      description: "Providing quality building mater...",
      img: "/v5.jpg",
    },
    {
      type: "Tradesmen",
      name: "HandyMates",
      description: "Reliable tradesmen for all your...",
      img: "/v6.jpeg",
    },
    
  ];

  const visibleCards = showAll ? cards : cards.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray flex flex-col items-center p-6">
      {/* Header Section */}
      <Header />

      {/* Cards Section */}
      <div className="w-full max-w-6xl mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleCards.map((item, index) => (
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
      {!showAll && (
        <div className="mt-12">
          <button
            className="px-10 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-gray-500 hover:to-gray-600 transition"
            onClick={() => setShowAll(true)}
          >
            More Tradesmen and Vendor
          </button>
        </div>
      )}
    </div>
  );
};

export default ConstructionComponent;





// import React from "react";
// import Header from "./Header";

// const ConstructionComponent = () => {
//   return (
//     <div className="min-h-screen bg-gray flex flex-col items-center p-6">
//       {/* Header Section */}
//       <Header />

//       {/* Cards Section */}
//       <div className="w-full max-w-6xl mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {[
//           {
//             type: "Vendor",
//             name: "Modeuz",
//             description: "We distribute cement, binding...",
//             img: "/v1.jpeg",
//           },
//           {
//             type: "Tradesmen",
//             name: "Joeslimart",
//             description: "We help home and business owne...",
//             img: "/v2.jpg",
//           },
//           {
//             type: "Vendor",
//             name: "AA+",
//             description: "Sales and Installation of besp...",
//             img: "/v3.jpg",
//           },
//         ].map((item, index) => (
//           <div
//             key={index}
//             className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-center border-t-4 border-black hover:border-yellow-800 transition duration-300"
//           >
//             <div className="w-28 h-28 mb-4">
//               <img
//                 src={item.img}
//                 alt={item.name}
//                 className="w-full h-full rounded-full shadow-md border-2 border-gray-300"
//               />
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 mb-1">
//               {item.type}
//             </h3>
//             <h4 className="text-lg font-semibold text-gray-700">{item.name}</h4>
//             <p className="text-gray-500 text-center text-sm">
//               {item.description}
//             </p>
//             <button className="mt-6 px-6 py-2 bg-yellow-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-purple-600 hover:to-purple-700 transition">
//               Visit
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* More Button */}
//       <div className="mt-12">
//         <button className="px-10 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-gray-500 hover:to-gray-600 transition">
//           More Tradesmen and Vendor
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ConstructionComponent;
