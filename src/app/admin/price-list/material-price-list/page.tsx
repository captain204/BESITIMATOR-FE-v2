"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import MaterialPriceList from "@/screens/Dashboard/MaterialPriceList/MaterialPriceList";


import React from "react";

const Page = () => {
  return (
    <Admin>
      <BreadcrumbsWithIcon route="Material Price List" root="Price List"/>
      <MaterialPriceList />
    </Admin>
  );
};

export default Page;