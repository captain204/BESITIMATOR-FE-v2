"use client";

import Layout from "@/components/Layout";
import AboutHeader from "@/screens/AboutScreen/AboutHeader";
import EventDetail from "@/screens/InventsAndWorkshops/EventDetailes";
import { useSearchParams } from "next/navigation";

import React from "react";

const Page = ({ events }: { events: any[] | undefined }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the 'id' from the URL search params

  // Handle undefined or empty events array
  if (!events || events.length === 0) {
    return <p>No events available</p>;
  }

  const event = events.find((e) => e.id === id); // Find the event by ID

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="overflow-hidden">
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
            <EventDetail event={event} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Page;
