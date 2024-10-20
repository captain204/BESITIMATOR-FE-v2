import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import FAQSection from "@/screens/FAQs/FAQs";
import React from "react";

const page = () => {
  return (
    <div className="bg-secondary">
      <Layout>
        <AboutHeader
          title="FAQs"
          breadcrumbItems={[{ label: "Home", link: "/" }, { label: "FAQs" }]}
        />

        <FAQSection />
      </Layout>
    </div>
  );
};

export default page;
