"use client";

import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import QuestionsManager from "@/screens/Dashboard/Questions/Questions";

import React from "react";

const Page = () => {
  return (
    <Admin>
      <BreadcrumbsWithIcon route="Estimate Builder" root="Questions" />
      <QuestionsManager />
    </Admin>
  );
};

export default Page;
