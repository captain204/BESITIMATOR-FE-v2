

import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import React from "react";

const page = () => {
  return (
    <div className="bg-secondary">
      <Layout>
        <AboutHeader
          title="FAQs"
          breadcrumbItems={[
            { label: "Dashboard", link: "/" },
            { label: "Dashboard" },
          ]}
        />

        <div className=" my-40">
          <h1 className="text-secondary text-center text-5xl ">
            Dashboard
          </h1>
        </div>
      </Layout>
    </div>
  );
};

export default page;
