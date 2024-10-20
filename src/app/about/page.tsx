import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import About from "@/screens/LandingPageScreen/About";
import Experience from "@/screens/LandingPageScreen/Experience";
import React from "react";

const page = () => {
  return (
    <div className="bg-black overflow-hidden">
      <Layout>
        <AboutHeader
          title="About"
          breadcrumbItems={[{ label: "Home", link: "/" }, { label: "About" }]}
        />

        <Experience />
        <About />
      </Layout>
    </div>
  );
};

export default page;
