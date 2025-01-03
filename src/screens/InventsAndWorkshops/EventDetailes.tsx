import { Button, Typography } from "@material-tailwind/react";
import Link from "next/link";

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

// Get Static Paths for Each Event
export const getStaticPaths = async () => {
  const paths = events.map((event) => ({
    params: { id: event.id },
  }));

  return { paths, fallback: false }; // Ensure static generation for all paths
};

// Fetch the specific event based on id in the URL
export const getStaticProps = async (context: any) => {
  const { id } = context.params;
  const event = events.find((event) => event.id === id);

  return { props: { event } };
};

// EventDetail Component to Display Event Information
const EventDetail: React.FC<{ event: typeof events[0] }> = ({ event }) => {
  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <Typography variant="h3" className="font-bold text-blue-700 mb-4">
            {event.title}
          </Typography>
          <Typography className="text-gray-700 mb-6">
            {event.description}
          </Typography>
          <Link href="/" passHref>
            <Button variant="gradient" color="blue">
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
