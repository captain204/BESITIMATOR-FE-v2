import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import EventList from "@/screens/InventsAndWorkshops/EventList";
import React from "react";

const page = () => {
  return (
    <div className=" overflow-hidden">
      <Layout>
        <AboutHeader
          title="Events-and-workshops"
          breadcrumbItems={[
            { label: "Home", link: "/" },
            { label: "events-and-workshops" },
          ]}
        />
        <div
          className="bg-cover relative bg-center overflow-hidden"
          style={{ backgroundImage: 'url("/benifit.png")' }}
        >
          <div className="absolute inset-0 bg-white opacity-95"></div>
          <div className="relative">
            <EventList />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default page;
