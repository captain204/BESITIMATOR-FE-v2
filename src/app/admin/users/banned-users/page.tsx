"use client";
import Admin from "@/screens/Dashboard/Admin";
import UserList from "@/screens/Dashboard/Users/AllUsers";

import React from "react";

const Page = () => {
  return (
    <Admin>
      <UserList />
    </Admin>
  );
};

export default Page;