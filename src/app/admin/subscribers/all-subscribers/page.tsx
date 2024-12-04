"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import Subscribers from "@/screens/Dashboard/Subscribers/Subscribers";


import React from "react";

const Page = () => {
  return (
    <Admin>
       <BreadcrumbsWithIcon route="All Subscribers" root="Subscribers"/>
      <Subscribers />
    </Admin>
  );
};

export default Page;