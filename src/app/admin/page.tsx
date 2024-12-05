import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import AdminLoginScreen from "@/screens/AuthScreens/AdminLogin";
import React from "react";

const page = () => {
  return (
    <Layout>
       <AboutHeader
        title="AdminLogin"
        breadcrumbItems={[{ label: "Home", link: "/" }, { label: "Admin Login" }]}
      />
      <AdminLoginScreen />
      </Layout>
  );
};

export default page;
