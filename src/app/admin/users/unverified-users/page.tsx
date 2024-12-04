"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import UnverifiedUsers from "@/screens/Dashboard/Users/UnVerifiedUsers";

import React from "react";

const Page = () => {
  return (
    <Admin>
       <BreadcrumbsWithIcon route="Unverified Users" root="Users"/>
      <UnverifiedUsers  />
    </Admin>
  );
};

export default Page;