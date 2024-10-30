import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import ContactUs from "@/screens/LandingPageScreen/Subscribe";
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
         <ContactUs />
      </Layout>
    </div>
  );
};

export default page;
