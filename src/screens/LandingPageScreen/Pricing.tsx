"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useRef } from "react";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3 text-yellow-700"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export function PricingCard({ plan, price, features, sub, under }: any) {
  return (
    <Card
      variant="gradient"
      className="w-96 h-[400px] p-8 bg-white border border-gray-200 shadow-lg rounded-xl transform transition-all duration-300 hover:scale-105"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-gray-300 pb-8 text-center"
      >
        <Typography
          variant="small"
          className="font-semibold text-xl uppercase text-black mb-3"
        >
          {plan}
        </Typography>

        <Typography
          variant="h1"
          className="mb-4 flex justify-center gap-1 text-3xl font-bold text-yellow-700"
        >
          <span className="text-3xl">₦</span>
          {price}
          <span className="text-3xl">/{under}</span>
        </Typography>

        <Typography className="text-black  text-2sm">{sub}</Typography>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4 text-black">
          {features.map((feature: any, index: any) => (
            <li key={index} className="flex items-center gap-2">
              <span className="rounded-full border border-yellow-500 bg-yellow-100 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">{feature}</Typography>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="mt-8 p-0">
        <Button
          size="lg"
          className="bg-yellow-700 text-black hover:bg-yellow-700 hover:scale-105 transition-transform transform"
          ripple={false}
          fullWidth={true}
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
}

const Pricing = () => {
  const ref = useRef(null);

  const cards = [
    {
      plan: "Automated Calculation",
      price: "0.00",
      features: ["No of 50 Automatic calculation"],
      sub: "For New User First 50 Automated Calculation Free",
      under: "50",
    },
    {
      plan: "Automated Calculation",
      price: "10,000.00",
      features: ["No of 100 Automatic calculation"],
      sub: "100 Automated calculation",
      under: "100",
    },
    {
      plan: "Custom Project",
      price: "0.00",
      features: ["No of 1 Project Available"],
      sub: "No of 1 Project Available",
      under: "1",
    },

    {
      plan: "Cost Tracker",
      price: "10,000.00",
      features: ["No of 1 Project Available"],
      sub: "First cost tracker is free for all users.",
      under: "1",
    },

    {
      plan: "custom project",
      price: "0.00",
      features: ["No of 1 Project Available"],
      sub: "1",
      under: "1",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <div
      ref={ref}
      className="flex justify-center gap-6 flex-wrap py-20 relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: 'url("/benifit.png")' }}
    >
      <div className="absolute inset-0 bg-white opacity-95"></div>
      {cards.map((card, index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          whileInView="visible"
          variants={cardVariants}
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          <PricingCard
            plan={card.plan}
            price={card.price}
            features={card.features}
            sub={card.sub}
            under={card.under}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Pricing;
