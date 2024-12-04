"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import CallRequest from "@/screens/Dashboard/RequestCall/RequestCall";



import React from "react";

const Page = () => {
  return (
    <Admin>
      <BreadcrumbsWithIcon route="Response" root="Call Request"/>
      <CallRequest />
    </Admin>
  );
};

export default Page;