"use client";
import Admin from "@/screens/Dashboard/Admin";
import MaterialPriceList from "@/screens/Dashboard/MaterialPriceList/MaterialPriceList";


import React from "react";

const Page = () => {
  return (
    <Admin>
      <MaterialPriceList />
    </Admin>
  );
};

export default Page;