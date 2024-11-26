"use client";

import Admin from "@/screens/Dashboard/Admin";
import DashboardCards from "@/screens/Dashboard/Dashboard";
import QuestionsManager from "@/screens/Dashboard/Questions/Questions";

import React from "react";

const Page = () => {
  return (
    <Admin>
      <QuestionsManager />
    </Admin>
  );
};

export default Page;
