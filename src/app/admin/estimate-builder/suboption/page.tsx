"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import SubOptionAdmin from "@/screens/Dashboard/SubOption/SubOption";

import React from "react";

const Page = () => {
  return (
    <Admin>
      <BreadcrumbsWithIcon route="Sub Option" root="Estimate Builder" />
      <SubOptionAdmin />
    </Admin>
  );
};

export default Page;
