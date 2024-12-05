"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import OptionAdmin from "@/screens/Dashboard/Options/Options";



import React from "react";

const Page = () => {
  return (
    <Admin>
      <BreadcrumbsWithIcon route="Option" root="Estimate Builder" />
      <OptionAdmin />
    </Admin>
  );
};

export default Page;