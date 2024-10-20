import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import PrivacyPolicy from "@/screens/PrivacyScreen/PrivacyPolicy";
import React from "react";

const page = () => {
  return (
    <div className="bg-tetiary">
      <Layout>
        <AboutHeader
          title="Privacy Policy"
          breadcrumbItems={[{ label: "Home", link: "/" }, { label: "Privacy Policy" }]}
        />

        <PrivacyPolicy />
      </Layout>
    </div>
  );
};

export default page;
