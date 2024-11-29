"use client";
import Admin from "@/screens/Dashboard/Admin";
import VerifiedUsers from "@/screens/Dashboard/Users/VerifiedUsers";

import React from "react";

const Page = () => {
  return (
    <Admin>
      <VerifiedUsers />
    </Admin>
  );
};

export default Page;