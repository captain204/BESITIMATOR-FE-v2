"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import DashboardCards from "@/screens/Dashboard/Dashboard";

import React from "react";

const Page = () => {
  return (
    <Admin>
   
      <BreadcrumbsWithIcon route="Dashboard" root="Admin" />
      
      <DashboardCards />
    </Admin>
  );
};

export default Page;
