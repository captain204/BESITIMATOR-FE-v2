import React from "react";
import Layout from "@/components/Layout";
import Changepassword from "@/screens/AuthScreens/ChangePassword";

const page = () => {
  return (
    <div className="bg-tetiary">
      <Layout>
        <Changepassword />
      </Layout>
    </div>
  );
};

export default page;
