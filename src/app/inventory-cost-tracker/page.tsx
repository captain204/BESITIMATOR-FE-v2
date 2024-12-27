import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import Inventory from "@/screens/Construction-Inventory/Inventory";
import React from "react";

const page = () => {
  return (
    <div className=" overflow-hidden">
      <Layout>
        <AboutHeader
          title="Inventory-cost-tracker"
          breadcrumbItems={[
            { label: "Home", link: "/" },
            { label: "inventory-cost-tracker" },
          ]}
        />
        <div
          className="bg-cover relative bg-center overflow-hidden"
          style={{ backgroundImage: 'url("/benifit.png")' }}
        >
          <div className="absolute inset-0 bg-white opacity-95"></div>
          <div className="relative">
            <Inventory />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default page;
