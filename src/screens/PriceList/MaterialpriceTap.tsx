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
      label: "Construction Material Price List",
      value: "material",
      icon: Square3Stack3DIcon,
      desc: <PriceTable />,
    },
    {
      label: "Construction Labour rate",
      value: "labour",
      icon: UserCircleIcon,
      desc: <LabourPriceList  />,
    },
  ];
  return (
    <Tabs value="material">
      <TabsHeader className=" mx-6"  >
        {data.map(({ label, value, icon }) => (
          <Tab key={value} value={value}
          
          >
            <div className="flex items-center justify-center gap-2 md:font-bold  md:text-lg text-sm ">
              {/* {React.createElement(icon, { className: "w-5 h-5" })} */}
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
