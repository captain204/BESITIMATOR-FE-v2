"use client";

import { Carousel } from "@material-tailwind/react";

const SlideSection = () => {
  return (
    <div className="md:h-[100vh]">
      <Carousel className="rounded-none h-full" autoplay loop={true}>
        <img
          src="/slide1.jpg"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img src="/slide2.jpg" className="h-full w-full object-cover" />
        <img
          src="/slide3.jpg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    </div>
  );
};

export default SlideSection;
