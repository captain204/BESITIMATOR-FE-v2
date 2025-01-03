"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

// Mock Event Data
const events = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description:
      "Join us for an inspiring tech conference with industry leaders.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661306437817-8ab34be91e0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnRzfGVufDB8fDB8fHww",
  },
  {
    id: "2",
    title: "Art Workshop",
    description: "Explore your creativity with our expert-led art workshops.",
    imageUrl:
      "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXZlbnRzfGVufDB8fDB8fHww",
  },
  {
    id: "3",
    title: "Music Festival",
    description: "Experience an unforgettable day of music and fun.",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661340622801-6e19ab613b2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGV2ZW50c3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

// Event List Page
const EventList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <Typography
        variant="h2"
        className="text-center text-blue-700 mb-8 font-bold"
      >
        Upcoming Events
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {events.map((event) => (
          <Card key={event.id} className="shadow-lg hover:shadow-xl transition md:mb-0 mb-6">
            <CardHeader color="blue" className="relative h-56">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="h5" className="font-bold mb-2">
                {event.title}
              </Typography>
              <Typography className="text-gray-600 mb-4">
                {event.description}
              </Typography>
              <Link href={`/construction-events-and-workshops/${event.id}`} passHref>
                <Button variant="gradient" className="bg-yellow-800">
                  View Details
                </Button>
              </Link>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventList;
