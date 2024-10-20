import Layout from "@/components/Layout";
import LoginScreen from "@/screens/AuthScreens/LoginScreen";
import ResetPasswordScreen from "@/screens/AuthScreens/ResetPassword";
import React from "react";

const page = () => {
  return (
    <div className="bg-tetiary">
      <Layout>
        <ResetPasswordScreen />
      </Layout>
    </div>
  );
};

export default page;
