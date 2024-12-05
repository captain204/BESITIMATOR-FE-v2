"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import Categories from "@/screens/Dashboard/Category/Categories";
import React from "react";
const Page = () => {
  return (
    <Admin>
      <BreadcrumbsWithIcon route="Category" root="Estimate Builder" />
      <Categories />
    </Admin>
  );
};

export default Page;
