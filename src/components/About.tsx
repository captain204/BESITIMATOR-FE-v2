"use client"
import React from "react";
import Abouttwo from "../screens/LandingPageScreen/Abouttwo";
import Progress from "../screens/LandingPageScreen/Progress";
import { motion } from "framer-motion";

// Define motion variants
const imageVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
};

const About = () => {
  return (
    <div className="bg-secondary">
      <section className="body-font overflow-hidden md:block hidden">
        <div className="mx-14 flex py-24 md:flex-row flex-col items-center">
          {/* Image with motion */}
          <motion.div
            className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-16 md:mb-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={imageVariants}
          >
            <img
              className="object-cover object-center rounded w-full h-96"
              alt="hero"
              src="/about.jpg"
            />
          </motion.div>

          {/* Text content with motion */}
          <motion.div
            className="lg:flex-grow md:w-1/2 md:pl-20 flex flex-col md:items-start md:text-left items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={textVariants}
          >
            <h4 className="text-white font-bold mb-2">WHO WE ARE</h4>

            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              About Company
            </h1>

            <p className="mb-8 leading-relaxed font-bold md:mr-6 text-lg text-white">
              Mauris porttitor vestibulum orci. Morbi eget libero ac tortor
              fringilla faucibus. Cras dolor. Integer sapien.
            </p>

            <p className="mb-8 leading-relaxed md:mr-6 text-white">
              Whether you are building a new office or are updating your
              ventilations, you can count on us for professional and affordable
              services. We work with you to ensure your new vent systems are
              repaired or installed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Additional Sections */}
      <Abouttwo />
      <Progress />
    </div>
  );
};

export default About;
