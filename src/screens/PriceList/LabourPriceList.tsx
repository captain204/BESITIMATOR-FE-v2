import React, { useState } from "react";

const PricingTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const tableData = [
    {
      item: "PRECAST Concrete Fascia",
      lowerDaily: "₦0.00",
      higherDaily: "₦0.00",
      averageDaily: "₦0.00",
      unit: "Lin. m",
      lowerUnit: "₦1,500.00",
      higherUnit: "₦2,000.00",
      averageUnit: "₦2,000.00",
    },
    {
      item: "Plastering Works / Rendering Works to General Wall Areas",
      lowerDaily: "₦4,000.00",
      higherDaily: "₦6,000.00",
      averageDaily: "₦5,000.00",
      unit: "m²",
      lowerUnit: "₦400.00",
      higherUnit: "₦600.00",
      averageUnit: "₦600.00",
    },
    {
      item: "Plastering Works / Rendering Works to areas less than 300mm width",
      lowerDaily: "₦4,000.00",
      higherDaily: "₦6,000.00",
      averageDaily: "₦5,000.00",
      unit: "m",
      lowerUnit: "₦200.00",
      higherUnit: "₦300.00",
      averageUnit: "₦300.00",
    },
    {
      item: "Rendering Floated Backing to Receive Tiles to General Areas",
      lowerDaily: "₦4,000.00",
      higherDaily: "₦6,000.00",
      averageDaily: "₦5,000.00",
      unit: "m²",
      lowerUnit: "₦300.00",
      higherUnit: "₦400.00",
      averageUnit: "₦400.00",
    },
    {
      item: "Rendering Floated Backing to Receive Tiles to areas less than 300mm width",
      lowerDaily: "₦4,000.00",
      higherDaily: "₦6,000.00",
      averageDaily: "₦5,000.00",
      unit: "m",
      lowerUnit: "₦50.00",
      higherUnit: "₦100.00",
      averageUnit: "₦100.00",
    },
  ];

  // Filtered data based on the search term
  const filteredData = tableData.filter((row) =>
    row.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/3 p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-black text-white">
            <tr>
              <th rowSpan={2} className="border border-gray-300 px-4 py-2 text-left font-medium">
                Item/Area of Work
              </th>
              <th colSpan={3} className="border border-gray-300 px-4 py-2 text-center font-medium">
                If considering to pay labour per day - Daily Rates
              </th>
              <th rowSpan={2} className="border border-gray-300 px-4 py-2 text-left font-medium">
                Unit of Costing
              </th>
              <th colSpan={3} className="border border-gray-300 px-4 py-2 text-center font-medium">
                If considering to pay labour amount of work achieved - per lin.m, per m² or per m³
              </th>
            </tr>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                Lower Point Daily Rate - Payment per day
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                Higher Point Daily Rate - Payment per day
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                Average Daily Rate - Payment per day
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                Lower Point Rate - per unit
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                Higher Point Rate - per unit
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">
                Average Point Rate - per unit
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{row.item}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.lowerDaily}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.higherDaily}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.averageDaily}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.unit}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.lowerUnit}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.higherUnit}</td>
                  <td className="border border-gray-300 px-4 py-2">{row.averageUnit}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="border border-gray-300 px-4 py-2 text-center">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;





// import React from "react";

// const PricingTable = () => {
//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full table-auto border-collapse border border-gray-300">
//         <thead className="bg-black text-white">
//           <tr>
//             <th rowSpan={2} className="border border-gray-300 px-4 py-2 text-left font-medium">
//               Item/Area of Work
//             </th>
//             <th colSpan={3} className="border border-gray-300 px-4 py-2 text-center font-medium">
//               If considering to pay labour per day - Daily Rates
//             </th>
//             <th rowSpan={2} className="border border-gray-300 px-4 py-2 text-left font-medium">
//               Unit of Costing
//             </th>
//             <th colSpan={3} className="border border-gray-300 px-4 py-2 text-center font-medium">
//               If considering to pay labour amount of work achieved - per lin.m, per m² or per m³
//             </th>
//           </tr>
//           <tr>
//             <th className="border border-gray-300 px-4 py-2 text-left font-medium">
//               Lower Point Daily Rate - Payment per day
//             </th>
//             <th className="border border-gray-300 px-4 py-2 text-left font-medium">
//               Higher Point Daily Rate - Payment per day
//             </th>
//             <th className="border border-gray-300 px-4 py-2 text-left font-medium">
//               Average Daily Rate - Payment per day
//             </th>
//             <th className="border border-gray-300 px-4 py-2 text-left font-medium">
//               Lower Point Rate - per unit
//             </th>
//             <th className="border border-gray-300 px-4 py-2 text-left font-medium">
//               Higher Point Rate - per unit
//             </th>
//             <th className="border border-gray-300 px-4 py-2 text-left font-medium">
//               Average Point Rate - per unit
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td className="border border-gray-300 px-4 py-2">PRECAST Concrete Fascia</td>
//             <td className="border border-gray-300 px-4 py-2">₦0.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦0.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦0.00</td>
//             <td className="border border-gray-300 px-4 py-2">Lin. m</td>
//             <td className="border border-gray-300 px-4 py-2">₦1,500.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦2,000.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦2,000.00</td>
//           </tr>
//           <tr>
//             <td className="border border-gray-300 px-4 py-2">Plastering Works / Rendering Works to General Wall Areas</td>
//             <td className="border border-gray-300 px-4 py-2">₦4,000.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦6,000.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦5,000.00</td>
//             <td className="border border-gray-300 px-4 py-2">m²</td>
//             <td className="border border-gray-300 px-4 py-2">₦400.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦600.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦600.00</td>
//           </tr>
//           {/* Additional rows here */}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PricingTable;
