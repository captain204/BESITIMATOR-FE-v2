import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
// import About from "@/screens/LandingPageScreen/About";
import Terms from "@/screens/TermsAndConditionScreen/TermsAndConditionScreen";
import React from "react";

const page = () => {
  return (
    <div>
      <Layout>
        <AboutHeader
          title="Terms and Conditions"
          breadcrumbItems={[{ label: "Home", link: "/" }, { label: "T&C" }]}
        />

        <Terms />
      </Layout>
    </div>
  );
};

export default page;
