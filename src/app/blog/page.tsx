import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import Blog from "@/screens/Blog/Blog";
import React from "react";

const page = () => {
  return (
    <div className="">
      <Layout>
        <AboutHeader
          title="Blog"
          breadcrumbItems={[{ label: "Home", link: "/" }, { label: "Blog" }]}
        />

        <Blog />
        {/* <ContactUs /> */}
      </Layout>
    </div>
  );
};

export default page;
