"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import VerifiedUsers from "@/screens/Dashboard/Users/VerifiedUsers";

import React from "react";

const Page = () => {
  return (
    <Admin>
       <BreadcrumbsWithIcon route="Verified Users" root="Users"/>
      <VerifiedUsers />
    </Admin>
  );
};

export default Page;