"use client";
import Admin from "@/screens/Dashboard/Admin";
import UserList from "@/screens/Dashboard/Users/AllUsers";
import UnverifiedUsers from "@/screens/Dashboard/Users/UnVerifiedUsers";

import React from "react";

const Page = () => {
  return (
    <Admin>
      <UnverifiedUsers  />
    </Admin>
  );
};

export default Page;