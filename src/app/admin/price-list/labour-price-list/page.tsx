"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import LabourPriceList from "@/screens/Dashboard/LabourPriceList/LabourPriceList";



import React from "react";

const Page = () => {
  return (
    <Admin>
      <BreadcrumbsWithIcon route="Labour Price List" root="Price List"/>
      <LabourPriceList />
    </Admin>
  );
};

export default Page;