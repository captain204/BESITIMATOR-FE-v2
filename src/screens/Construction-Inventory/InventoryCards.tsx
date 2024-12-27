"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

const CardGrid = () => {
  const cards = [
    {
      image: "/i.png",
      title: "Budget properly and monitor expenses",
      description:
        "Monitoring and Tracking your expenses is a key factor to make your budget work for you.",
    },
    {
      image: "/i2.png",
      title: "Make clearer agreements with tradesmen/ vendors",
      description:
        "This tool helps make logical and clear agreements with your vendors and tradesmen.",
    },
    {
      image: "/i3.png",
      title: "Proper planning",
      description:
        "Proper planning is one of the advantages of using this tool which helps chart a course to achieve your goals.",
    },
    {
      image: "/i4.png",
      title: "Proper forecasting",
      description:
        "Proper forecasting is essential for every business in decision making which is one of the objectives of using this tool.",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-50">
        <main className="text-center  px-4 w-full max-w-3xl mb-20 md:mt-0 mt-20">
          <h1 className="text-2xl md:text-4xl font-semibold text-black mb-4">
            Construction Inventory/ Cost Tracker
          </h1>
          <p className="text-gray-600 text-sm md:text-base mb-4">
            This tool helps you understand the real-time cost of your
            construction project and helps you control its budget in return.
            Therefore, using this tool, you will be able to know if you are
            under budget, on budget or headed for a financial mishap.
          </p>
          <h2 className="text-lg md:text-xl font-bold text-black">
            Other benefits of using this tool are
          </h2>
        </main>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        {cards.map((card, index) => (
          <Card
            key={index}
            className="w-full"
            style={{ backgroundColor: "white" }}
          >
            <CardHeader color="blue-gray" className="relative h-56">
              <img
                src={card.image}
                alt={`card-image-${index}`}
                className="h-full w-full object-contain"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                {card.title}
              </Typography>
              <Typography>{card.description}</Typography>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center my-20">
        <Button variant="outlined">Please Sign up to continue</Button>
      </div>
    </>
  );
};

export default CardGrid;
