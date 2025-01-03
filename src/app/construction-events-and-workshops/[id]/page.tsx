"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import axiosInstance from "@/Globals/Interceptor";

const EventDetail = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<any>(null);
  const eventId = params.id;

  useEffect(() => {
    axiosInstance
      .get(`/api/events/${eventId}`)
      .then((response) => setEvent(response.data.data)) // Adjusted to access event details properly
      .catch((error) => console.error("Error fetching event detail:", error));
  }, [eventId]);

  if (!eventId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h6" className="text-gray-600">
          Loading event details...
        </Typography>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h6" className="text-gray-600">
          Loading event data...
        </Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 py-10 px-5">
      <Card className="max-w-4xl mx-auto shadow-2xl">
        <CardHeader className="relative h-96 rounded-t-xl overflow-hidden">
          <img
            src={event.image_path}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </CardHeader>
        <CardBody className="p-8">
          <Typography
            variant="h3"
            className="font-bold text-center mb-6 text-gray-800"
          >
            {event.title}
          </Typography>
          <Typography className="text-black text-lg leading-relaxed mb-8 text-justify">
            {event.description}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Typography variant="h6" className="font-semibold text-gray-800">
                📅 Date:
              </Typography>
              <Typography className="text-gray-700">
                {event.event_date || "TBA"}
              </Typography>
            </div>
            <div>
              <Typography variant="h6" className="font-semibold text-gray-800">
                📍 Location:
              </Typography>
              <Typography className="text-gray-700">
                {event.location || "TBA"}
              </Typography>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button
              size="lg"
              className="bg-yellow-800 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform transition"
            >
              Register Now
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EventDetail;

// import Layout from "@/components/Layout";
// import AboutHeader from "@/screens/AboutScreen/AboutHeader";
// import EventDetail from "@/screens/InventsAndWorkshops/EventDetailes";

// // Fetch the specific event by id

// const Page = () => {

//   return (
//     <div className="overflow-hidden">
//       <Layout>
//         <AboutHeader
//           title="Events-and-workshops Details"
//           breadcrumbItems={[
//             { label: "Home", link: "/" },
//             { label: "events-and-workshops-Details" },
//           ]}
//         />
//         <div
//           className="bg-cover relative bg-center overflow-hidden"
//           style={{ backgroundImage: 'url("/benifit.png")' }}
//         >
//           <div className="absolute inset-0 bg-white opacity-95"></div>
//           <div className="relative">
//            <div>

//             <h1 className="text-center text-7xl">Event Detail Page </h1>
//            </div>
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// };

// export default Page;
