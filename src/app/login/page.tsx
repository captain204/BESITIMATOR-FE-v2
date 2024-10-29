import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import LoginScreen from "@/screens/AuthScreens/LoginScreen";

import React from "react";

const page = () => {
  return (
    <Layout>
      <AboutHeader
        title="Login"
        breadcrumbItems={[{ label: "Home", link: "/" }, { label: "Login" }]}
      />
      <LoginScreen />
    </Layout>
  );
};

export default page;
