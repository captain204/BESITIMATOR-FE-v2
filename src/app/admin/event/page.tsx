"use client";

import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import Events from "@/screens/Dashboard/Event/Event";

import React from "react";

const Page = () => {
  return (
    <Admin>
      <BreadcrumbsWithIcon route="Events" root="Admin" />
      <Events />
    </Admin>
  );
};

export default Page;
