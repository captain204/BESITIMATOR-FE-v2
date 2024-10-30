import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import FAQSection from "@/screens/FAQs/FAQs";
import ContactUs from "@/screens/LandingPageScreen/Subscribe";
import React from "react";

const page = () => {
  return (
    <div className="">
      <Layout>
        <AboutHeader
          title="FAQs"
          breadcrumbItems={[{ label: "Home", link: "/" }, { label: "FAQs" }]}
        />

        <FAQSection />
        <ContactUs />
      </Layout>
    </div>
  );
};

export default page;
