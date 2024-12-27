import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import TradesMen from "@/screens/TradesMen/TradesMen";
import React from "react";

const page = () => {
  return (
    <div className=" overflow-hidden">
      <Layout>
        <AboutHeader
          title="vendors-log"
          breadcrumbItems={[
            { label: "Home", link: "/" },
            { label: "vendors-log" },
          ]}
        />
        <div
          className="bg-cover relative bg-center overflow-hidden"
          style={{ backgroundImage: 'url("/benifit.png")' }}
        >
          <div className="absolute inset-0 bg-white opacity-95"></div>
          <div className="relative">
            <TradesMen />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default page;
