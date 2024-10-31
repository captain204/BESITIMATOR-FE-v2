import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import Pricing from "@/screens/LandingPageScreen/Pricing";
import ContactUs from "@/screens/LandingPageScreen/Subscribe";
import React from "react";

const page = () => {
  return (
    <div className="bg-tetiary overflow-hidden">
      <Layout>
        <AboutHeader
          title="Pricing"
          breadcrumbItems={[{ label: "Home", link: "/" }, { label: "Pricing" }]}
        />

        <Pricing />
        <ContactUs />
      </Layout>
    </div>
  );
};

export default page;
