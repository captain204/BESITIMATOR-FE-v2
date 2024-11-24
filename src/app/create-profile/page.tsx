import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import Blog from "@/screens/Blog/Blog";
import CreateProfileScreen from "@/screens/ProfileScreen/CreateProfileScreen";
import React from "react";

const page = () => {
  return (
    <div className="">
      <Layout>
        <AboutHeader
          title="Create Profile"
          breadcrumbItems={[{ label: "Home", link: "/" }, { label: "Create Profile" }]}
        />

        <CreateProfileScreen />
        {/* <ContactUs /> */}
      </Layout>
    </div>
  );
};

export default page;
