"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

const Blog = () => {
  const cardData = [
    {
      title: "Wooden House, Florida",
      imageUrl:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      rating: 5.0,
      description:
        "Enter a freshly updated and thoughtfully furnished peaceful home surrounded by ancient trees, stone walls, and open meadows.",
      price: "$129 per night",
      amenities: ["Free wifi", "2 bedrooms", `65" HDTV`],
    },
    {
      title: "Cozy Cabin, Vermont",
      imageUrl:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      description:
        "Escape to this cozy cabin with mountain views and a fireplace, perfect for a peaceful getaway.",
      price: "$110 per night",
      amenities: ["Hot tub", "Mountain view", "Fireplace"],
    },
    {
      title: "Luxury Villa, California",
      imageUrl:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzUxOTh8MHwxfGFsbHwxfHx8fHx8fHwxNjYzMjM1MjA5&ixlib=rb-1.2.1&q=80&w=400",
      rating: 5.0,
      description:
        "A stunning luxury villa with a private pool, ocean views, and modern amenities for a dream vacation.",
      price: "$299 per night",
      amenities: ["Private pool", "Ocean view", "Outdoor kitchen"],
    },
    {
      title: "Beach House, Malibu",
      imageUrl:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      rating: 4.7,
      description:
        "Stay in this beachfront property with panoramic ocean views and direct beach access.",
      price: "$210 per night",
      amenities: ["Beachfront", "Panoramic views", "Balcony"],
    },
    {
      title: "Mountain Lodge, Colorado",
      imageUrl:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      rating: 4.9,
      description:
        "Experience a peaceful mountain retreat with hiking trails and stunning landscapes.",
      price: "$150 per night",
      amenities: ["Hiking trails", "Mountain view", "Fireplace"],
    },
    {
      title: "Urban Apartment, New York",
      imageUrl:
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      rating: 4.5,
      description:
        "Modern apartment in the heart of the city, perfect for business travelers and tourists.",
      price: "$180 per night",
      amenities: ["City view", "High-speed WiFi", "Rooftop access"],
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cardData.map((card, index) => (
        <Card key={index} className="w-full max-w-[26rem] shadow-lg">
          <CardHeader floated={false} color="blue-gray">
            <img src={card.imageUrl} alt={card.title} />
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
            <IconButton
              size="sm"
              color="red"
              variant="text"
              className="!absolute top-4 right-4 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </IconButton>
          </CardHeader>
          <CardBody>
            <div className="mb-3 flex items-center justify-between">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-medium"
              >
                {card.title}
              </Typography>
              <Typography
                color="blue-gray"
                className="flex items-center gap-1.5 font-normal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-0.5 h-5 w-5 text-yellow-700"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                {card.rating}
              </Typography>
            </div>
            <Typography color="gray">{card.description}</Typography>
            <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
              <Tooltip content={card.price}>
                <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M12 1.75a.75.75 0 01.75.75v1.08a8.25 8.25 0 017.67 7.67h1.08a.75.75 0 010 1.5h-1.08a8.25 8.25 0 01-7.67 7.67v1.08a.75.75 0 01-1.5 0v-1.08a8.25 8.25 0 01-7.67-7.67H2.25a.75.75 0 010-1.5h1.08a8.25 8.25 0 017.67-7.67V2.5a.75.75 0 01.75-.75zM6.11 12a5.995 5.995 0 005.89 5.89V6.11A5.995 5.995 0 006.11 12z" />
                  </svg>
                </span>
              </Tooltip>
              {card.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="rounded-full border border-gray-900/5 bg-gray-900/5 px-4 py-1.5 text-xs font-medium text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </CardBody>
          <CardFooter className="pt-8">
            <Button size="lg" fullWidth={true}>
              Read more
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Blog;
