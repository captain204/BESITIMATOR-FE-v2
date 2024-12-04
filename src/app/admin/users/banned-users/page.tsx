"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import BannedUsers from "@/screens/Dashboard/Users/BannedUsers";

import React from "react";

const Page = () => {
  return (
    <Admin>
      <BreadcrumbsWithIcon route="Banned Users" root="Users"/>
      < BannedUsers  />
    </Admin>
  );
};

export default Page;