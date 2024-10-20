import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import LoginScreen from "@/screens/AuthScreens/LoginScreen";

import React from "react";

const page = () => {
  return (
    <div className="bg-tetiary">
      <Layout>
      <AboutHeader
          title="Login"
          breadcrumbItems={[{ label: "Home", link: "/" }, { label: "Login" }]}
        />
        <LoginScreen />
      </Layout>
    </div>
  );
};

export default page;
