"use client";

import axiosInstance from "@/Globals/Interceptor";
import React, { useEffect, useState } from "react";

type MaterialPrice = {
  id: number;
  material: string;
  price_group: string;
  specification?: string;
  size?: string;
  low_price_point: number;
  higher_price_point: number;
  average_price_point: number;
};

export default function PriceTable() {
  const [data, setData] = useState<MaterialPrice[]>([]);
  const [filteredData, setFilteredData] = useState<MaterialPrice[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<{ data: MaterialPrice[] }>(
          "/api/admin/material-price-lists"
        );
        setData(response.data.data || []);
        setFilteredData(response.data.data || []); // Initialize filteredData
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = data.filter(
      (item) =>
        item.material.toLowerCase().includes(term) ||
        item.price_group.toLowerCase().includes(term) ||
        (item.specification &&
          item.specification.toLowerCase().includes(term)) ||
        (item.size && item.size.toLowerCase().includes(term))
    );

    setFilteredData(filtered);
  };

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="mb-4 flex justify-center md:justify-end">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="w-64 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            onClick={() =>
              handleSearch({ target: { value: searchTerm } } as any)
            }
            className="p-2 bg-black text-white rounded-r-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-black text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Building Material
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Material Specification
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Quantity/Size
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Lower price point
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Higher price point
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Average price point
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <React.Fragment key={item.id}>
                  {index === 0 ||
                  filteredData[index - 1].material !== item.material ? (
                    <tr className="bg-gray-800">
                      <td
                        className="border border-gray-300 px-4 py-2 font-semibold text-white"
                        colSpan={6}
                      >
                        {item.material}
                      </td>
                    </tr>
                  ) : null}
                  <tr className="text-black">
                    <td className="border border-gray-300 px-4 py-2">
                      {item.price_group}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.specification || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.size || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ₦{item.low_price_point?.toLocaleString() || "0.00"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ₦{item.higher_price_point?.toLocaleString() || "0.00"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ₦{item.average_price_point?.toLocaleString() || "0.00"}
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td
                  className="border border-gray-300 px-4 py-2 text-center text-red-500"
                  colSpan={6}
                >
                  No results found for "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// "use client";

// import axiosInstance from "@/Globals/Interceptor";
// import React, { useEffect, useState } from "react";

// export default function PriceTable() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get(
//           "/api/admin/material-price-lists"
//         );
//         setData(response.data); // Ensure this matches the structure of your API response
//       } catch (err: any) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

// //   if (loading) {
// //     return <div className="p-4 text-center">Loading...</div>;
// //   }

// //   if (error) {
// //     return <div className="p-4 text-center text-red-500">Error: {error}</div>;
// //   }

//   return (
//     <div className="overflow-x-auto p-4">
//       <table className="w-full border-collapse border border-gray-300">
//         <thead className="bg-black">
//           <tr>
//             <th className="border border-gray-300 px-4 py-2 text-left">
//               Building Material
//             </th>
//             <th className="border border-gray-300 px-4 py-2 text-left">
//               Material Specification
//             </th>
//             <th className="border border-gray-300 px-4 py-2 text-left">
//               Quantity/Size
//             </th>
//             <th className="border border-gray-300 px-4 py-2 text-left">
//               Lower price point
//             </th>
//             <th className="border border-gray-300 px-4 py-2 text-left">
//               Higher price point
//             </th>
//             <th className="border border-gray-300 px-4 py-2 text-left">
//               Average price point
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Water Heater Section */}
//           <tr className="bg-gray-800">
//             <td
//               className="border border-gray-300 px-4 py-2 font-semibold"
//               colSpan={6}
//             >
//               Water Heater
//             </td>
//           </tr>
//           <tr className="text-black">
//             <td className="border border-gray-300 px-4 py-2">Water Heater</td>
//             <td className="border border-gray-300 px-4 py-2">
//               30 Litre (Ariston)
//             </td>
//             <td className="border border-gray-300 px-4 py-2">1 unit</td>
//             <td className="border border-gray-300 px-4 py-2">₦46,000.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦50,000.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦48,000.00</td>
//           </tr>

//           {/* Cement Section */}
//           <tr className="bg-gray-800">
//             <td
//               className="border border-gray-300 px-4 py-2 font-semibold"
//               colSpan={6}
//             >
//               Cement
//             </td>
//           </tr>
//           <tr className="text-black">
//             <td className="border border-gray-300 px-4 py-2">
//               1 bag - 50kg Cement
//             </td>
//             <td className="border border-gray-300 px-4 py-2">Retail Price</td>
//             <td className="border border-gray-300 px-4 py-2">50kg</td>
//             <td className="border border-gray-300 px-4 py-2">₦3,800.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦3,900.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦3,850.00</td>
//           </tr>

//           {/* Finishing Section */}
//           <tr className="bg-gray-800">
//             <td
//               className="border border-gray-300 px-4 py-2 font-semibold"
//               colSpan={6}
//             >
//               Finishing
//             </td>
//           </tr>
//           <tr className="text-black">
//             <td className="border border-gray-300 px-4 py-2">
//               Polyfiber Skirting
//             </td>
//             <td className="border border-gray-300 px-4 py-2">
//               2.4m length - but per m
//             </td>
//             <td className="border border-gray-300 px-4 py-2">100mm</td>
//             <td className="border border-gray-300 px-4 py-2">₦2,000.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦3,000.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦2,500.00</td>
//           </tr>

//           {/* Steel Works Section */}
//           <tr className="bg-gray-800">
//             <td
//               className="border border-gray-300 px-4 py-2 font-semibold"
//               colSpan={6}
//             >
//               Steel Works
//             </td>
//           </tr>
//           <tr className="text-black">
//             <td className="border border-gray-300 px-4 py-2">Steel Plate</td>
//             <td className="border border-gray-300 px-4 py-2">
//               2mm Thick plate
//             </td>
//             <td className="border border-gray-300 px-4 py-2">2.4m X 1.2m</td>
//             <td className="border border-gray-300 px-4 py-2">₦17,000.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦21,000.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦19,000.00</td>
//           </tr>
//           <tr className="text-black">
//             <td className="border border-gray-300 px-4 py-2">H Beam</td>
//             <td className="border border-gray-300 px-4 py-2">H Beam Steel</td>
//             <td className="border border-gray-300 px-4 py-2">2" x 4" x 5.5m</td>
//             <td className="border border-gray-300 px-4 py-2">₦17,500.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦19,000.00</td>
//             <td className="border border-gray-300 px-4 py-2">₦18,250.00</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
