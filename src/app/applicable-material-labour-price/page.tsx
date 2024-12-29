import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import LabourPriceList from "@/screens/PriceList/PriceList";

import React from "react";

const page = () => {
  return (
    <div className="overflow-hidden">
      <Layout>
        <AboutHeader
          title="Material labour price"
          breadcrumbItems={[
            { label: "Home", link: "/" },
            { label: "material-labour-price" },
          ]}
        />
        <div
          className="bg-cover relative bg-center overflow-hidden"
          style={{ backgroundImage: 'url("/benifit.png")' }}
        >
          <div className="absolute inset-0 bg-white opacity-95"></div>
          <div className="relative">
            <LabourPriceList />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default page;
