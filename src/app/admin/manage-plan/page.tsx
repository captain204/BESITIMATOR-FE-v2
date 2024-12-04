"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import Plans from "@/screens/Dashboard/Plans/Plans";

import React from "react";

const Page = () => {
  return (
    <Admin>
      <BreadcrumbsWithIcon route="Manage Plan" root="Admin" />
      <Plans />
    </Admin>
  );
};

export default Page;
