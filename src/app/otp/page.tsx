import Layout from "@/components/Layout";
import OtpInput from "@/screens/AuthScreens/OTPScreen";

import React from "react";

const page = () => {
  return (
    <div className="bg-tetiary">
      <Layout>
        <OtpInput />
      </Layout>
    </div>
  );
};

export default page;
