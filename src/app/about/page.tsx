import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import Experience from "@/screens/LandingPageScreen/Experience";
import ContactUs from "@/screens/LandingPageScreen/Subscribe";
import Subservices from "@/screens/LandingPageScreen/SubServices";
import React from "react";

const page = () => {
  return (
    <div className="bg-black overflow-hidden">
      <Layout>
        <AboutHeader
          title="About"
          breadcrumbItems={[{ label: "Home", link: "/" }, { label: "About" }]}
        />

        <Subservices />
        <Experience />

        <ContactUs />

        {/* <About /> */}
      </Layout>
    </div>
  );
};

export default page;
