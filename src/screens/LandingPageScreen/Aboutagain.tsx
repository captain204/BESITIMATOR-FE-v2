"use client"

import React from "react";
import { motion } from "framer-motion";
import { FaCircle } from "react-icons/fa6";
import Abouttwo from "./Abouttwo";
import Progress from "./Progress";

// Define motion variants for text and image
const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const imageVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } },
};

const Aboutagain = () => {
  return (
    <div className="bg-tetiary">
      <section className="dark:bg-white  ">
        <div className="grid lg:mx-14 mx-6 lg:gap-10 xl:gap-0 lg:grid-cols-12 md:pt-24">
          {/* Animated Image */}
          <motion.div
            className="lg:mt-0 lg:col-span-5 lg:flex md:block hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={imageVariants}
          >
            <img src="/about2.jpg" alt="mockup" className="w-full h-96" />
          </motion.div>

          {/* Animated Text */}
          <motion.div
            className="ml-auto place-self-center lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariants}
          >
            <h1 className="max-w-2xl mb-4 text-xl font-extrabold lg:mt-0 mt-6 tracking-tight leading-none md:text-3xl xl:text-5xltext-white">
              Services Offered by The Building Estimator
            </h1>
            <ul className="max-w-2xl marker:text-yellow-500 font-light text-white text-lg list-disc  pl-5">
              <li className=" md:items-start mb-2 ">
                Automated Building estimate- paid feature
              </li>
              <li className=" md:items-start mb-2">
                Custom building Estimator and Construction Budget Calculator
              </li>
              <li className=" items-start mb-2">
                Applicable Material and Labour Pricelist / Rates
              </li>
              <li className=" items-start mb-2">
                Construction inventory & costing tracker
              </li>
              <li className=" items-start mb-2">
              Construction events/ Workshops
              </li>
              <li className="flex items-center mb-2">
              Construction trades men/ Construction Vendors
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
   
    </div>
  );
};

export default Aboutagain;
