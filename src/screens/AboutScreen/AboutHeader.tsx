"use client";

import React from "react";
import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { bottomToTopVariants } from "@/components/constants/Framer";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface AboutHeaderProps {
  title: string;
  breadcrumbItems: { label: string; link?: string }[];
}

const AboutHeader: React.FC<AboutHeaderProps> = ({ title, breadcrumbItems }) => {
  return (
    <div
      className="relative w-full h-[20rem] bg-cover flex flex-col items-center justify-center text-white mt-20"
      style={{
        backgroundImage: `url('/bgimage.jpeg')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-90"></div>
      <motion.div
        className="text-center mb-10"
        initial="hide"
        whileInView="show"
        exit="hide"
        variants={bottomToTopVariants}
        viewport={{ once: true }}
      >
        <Typography
          variant="h6"
          color="white"
          className="text-5xl font-bold mx-auto"
        >
          {title}
        </Typography>

        <nav className="text-white text-xl mb-4 flex justify-center mt-5">
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
      </motion.div>
    </div>
  );
};

export default AboutHeader;
