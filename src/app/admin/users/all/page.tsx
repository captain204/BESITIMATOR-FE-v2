"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import UserList from "@/screens/Dashboard/Users/AllUsers";

import React from "react";

const Page = () => {
  return (
    <Admin>
       <BreadcrumbsWithIcon route="All Users" root="Users"/>
      <UserList />
    </Admin>
  );
};

export default Page;