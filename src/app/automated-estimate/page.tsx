import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import AutomatedEstimate from "@/screens/AutomatedEstimate/AutomatedEstimate";

import React from "react";

const page = () => {
  return (
    <div className=" overflow-hidden">
      <Layout>
        <AboutHeader
          title="Automated Estimate"
          breadcrumbItems={[
            { label: "Home", link: "/" },
            { label: "Automated Estimate" },
          ]}
        />
        <div className="bg-cover relative bg-center overflow-hidden" style={{ backgroundImage: 'url("/benifit.png")' }}>
        <div className="absolute inset-0 bg-white opacity-95"></div> 
        <div className="relative">
          <AutomatedEstimate />
        </div>
        </div>
      </Layout>
    </div>
  );
};

export default page;
