import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import AutomatedEstimate from "@/screens/AutomatedEstimate/AutomatedEstimate";
import Stepform from "@/screens/AutomatedEstimate/Stepform";
import React from "react";

const page = () => {
  return (
    <div className=" overflow-hidden">
      <Layout>
        <AboutHeader
          title="About"
          breadcrumbItems={[
            { label: "Home", link: "/" },
            { label: "Automated Estimate" },
          ]}
        />

        <AutomatedEstimate />

     
      </Layout>
    </div>
  );
};

export default page;
