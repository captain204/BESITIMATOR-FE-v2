import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import ContactUs from "@/screens/LandingPageScreen/Subscribe";
import React from "react";

const page = () => {
  return (
    <div className=" overflow-hidden">
      <Layout>
        <AboutHeader
          title="Your Product"
          breadcrumbItems={[{ label: "Home", link: "/" }, { label: "product" }]}
        />
        <div className="mx-auto overflow-hidden">
          <h1 className="text-black text-center md:text-4xl text-2xl mt-20 ">
            Please send an email to <br />
            <span className="text-blue-500">info@thebuildingestimator.com</span>
          </h1>
        </div>

        <ContactUs />
      </Layout>
    </div>
  );
};

export default page;
