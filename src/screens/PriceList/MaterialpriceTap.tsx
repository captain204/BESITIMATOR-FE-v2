"use client";
import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import PriceTable from "./TablePriceList";
import LabourPriceList from "./LabourPriceList";

const MaterialPriceTap = () => {
  const data = [
    {
      label: "Material Price List",
      value: "material",
      icon: Square3Stack3DIcon,
      desc: <PriceTable />,
    },
    {
      label: "Construction Labour Rates",
      value: "labour",
      icon: UserCircleIcon,
      desc: <LabourPriceList />,
    },
  ];
  return (
    <Tabs value="material" className="md:mt-0 mt-10">
      <TabsHeader className="md:mx-8 mx-8">
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            className="group flex items-center justify-center  font-bold text-lg "
          >
            <div className=" md:px-4 py-2 rounded-md">
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default MaterialPriceTap;



// "use client";
// import React from "react";
// import {
//   Tabs,
//   TabsHeader,
//   TabsBody,
//   Tab,
//   TabPanel,
// } from "@material-tailwind/react";
// import { Square3Stack3DIcon, UserCircleIcon } from "@heroicons/react/24/solid";
// import PriceTable from "./TablePriceList";
// import LabourPriceList from "./LabourPriceList";

// const MaterialPriceTap = () => {
//   const data = [
//     {
//       label: "Construction Material Price List",
//       value: "material",
//       icon: Square3Stack3DIcon,
//       desc: <PriceTable />,
//     },
//     {
//       label: "Construction Labour rate",
//       value: "labour",
//       icon: UserCircleIcon,
//       desc: <LabourPriceList />,
//     },
//   ];
//   return (
//     <Tabs value="material" className="md:mt-0 mt-10">
//       <TabsHeader className=" md:mx-8 mx-8">
//         {data.map(({ label, value }) => (
//           <Tab key={value} value={value}>
//             <div className="flex items-center justify-center gap-2 md:font-bold  md:text-lg text-sm ">
//               {label}
//             </div>
//           </Tab>
//         ))}
//       </TabsHeader>
//       <TabsBody>
//         {data.map(({ value, desc }) => (
//           <TabPanel key={value} value={value}>
//             {desc}
//           </TabPanel>
//         ))}
//       </TabsBody>
//     </Tabs>
//   );
// };

// export default MaterialPriceTap;
