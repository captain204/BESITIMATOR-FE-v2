"use client"
import React from "react";
import { motion } from "framer-motion";

// Define motion variants for text and image
const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } },
};

const Abouttwo = () => {
  return (
    <section className="dark:bg-white md:mt-24">
      <div className="grid lg:mx-14 mx-6 lg:gap-10 xl:gap-0 lg:grid-cols-12">
        {/* Animated Text */}
        <motion.div
          className="mr-auto place-self-center lg:col-span-7"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
        >
          <h1 className="max-w-2xl mb-4 text-xl font-extrabold lg:mt-0 mt-6 tracking-tight leading-none md:text-3xl xl:text-5xltext-white">
            Who can use The Build Estimator?
          </h1>
          <ul className="max-w-2xl font-light text-white text-lg list-disc  pl-5 marker:text-yellow-500">
            <li className=" md:items-start mb-2 ">
              Clients – Construction Clients
            </li>
            <li className="items-start mb-2">Students</li>
            <li className=" items-start mb-2">Estimators</li>
            <li className=" items-start mb-2">Building contractors</li>
            <li className=" items-start mb-2">
              Academics/teaching institutions
            </li>
            <li className="items-center mb-2">Architects and Designers</li>
            <li className="items-center mb-2">Construction Vendors</li>
            <li className=" items-center mb-2">Construction Stakeholders</li>
          </ul>
        </motion.div>

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
      </div>
    </section>
  );
};

export default Abouttwo;
