"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import Unsubscribers from "@/screens/Dashboard/Unsubscribers/Unsubscribers";

import React from "react";

const Page = () => {
  return (
    <Admin>
      <BreadcrumbsWithIcon route="Unsubscribers" root="Subscribers" />
      <Unsubscribers />
    </Admin>
  );
};

export default Page;
