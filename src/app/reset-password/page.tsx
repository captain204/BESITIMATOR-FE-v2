import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import ResetPasswordScreen from "@/screens/AuthScreens/ResetPassword";
import React from "react";

const page = () => {
  return (
    <div>
      <Layout>
      <AboutHeader
          title="Reset Password"
          breadcrumbItems={[
            { label: "Home", link: "/" },
            { label: "Reset Password" },
          ]}
        />
        <ResetPasswordScreen />
      </Layout>
    </div>
  );
};

export default page;
