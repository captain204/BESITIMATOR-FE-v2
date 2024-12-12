"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface AboutHeaderProps {
  title: string;
  breadcrumbItems: { label: string; link?: string }[];
}

const AboutHeader: React.FC<AboutHeaderProps> = ({ title, breadcrumbItems }) => {
  return (
    <div
      className="relative w-full md:h-[20rem] h-[15rem] bg-cover flex flex-col items-center justify-center text-white md:mt-20"
      style={{
        backgroundImage: `url('/bgimage.jpeg')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-90"></div>
      <div
        className="text-center mb-10 relative"
        // initial="hide"
        // whileInView="show"
        // exit="hide"
        // variants={bottomToTopVariants}
        // viewport={{ once: true }}
      >
        <Typography
          variant="h6"
          color="white"
          className="md:text-5xl text-3xl font-bold mx-auto  mt-28 md:mt-0"
        >
          {title}
        </Typography>

        <nav className="text-white text-lg mb-4 flex justify-center mt-5">
          <ol className="flex flex-wrap items-center space-x-3">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.link ? (
                  <li>
                    <Link href={item.link}>
                      <div className="hover:underline">{item.label}</div>
                    </Link>
                  </li>
                ) : (
                  <li>{item.label}</li>
                )}
                {index < breadcrumbItems.length - 1 && (
                  <li>
                    <FaChevronRight className="text-white" />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default AboutHeader;
