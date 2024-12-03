"use client";
import BreadcrumbsWithIcon from "@/components/BreadCrumb";
import Admin from "@/screens/Dashboard/Admin";
import NewsletterForm from "@/screens/Dashboard/NewsLetter/NewsLetter";


import React from "react";

const Page = () => {
  return (
    <Admin>
      <BreadcrumbsWithIcon route="Labour Price List" root="Price List"/>
      <NewsletterForm  />
    </Admin>
  );
};

export default Page;