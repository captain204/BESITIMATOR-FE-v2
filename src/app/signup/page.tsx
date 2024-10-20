import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import SignUpScreen from "@/screens/AuthScreens/SignUpScreen";
import React from "react";

const page = () => {
  return (
    <div className="bg-tetiary">
      <Layout>
      <AboutHeader
          title="SignUp"
          breadcrumbItems={[{ label: "Home", link: "/" }, { label: "Signup" }]}
        />
        <SignUpScreen />
      </Layout>
    </div>
  );
};

export default page;
