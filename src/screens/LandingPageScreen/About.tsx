"use client";
import React from "react";
import { motion } from "framer-motion";
import Abouttwo from "./Abouttwo";
import Progress from "./Progress";
import Aboutagain from "./Aboutagain";

// Define motion variants for text and image
const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const imageVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3 } },
};

const About = () => {
  return (
    <div>
      <section className="dark:bg-white">
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
              Benefits of Automated Building Estimates
            </h1>
            <ul className="max-w-2xl font-light text-white text-lg list-disc  pl-5 marker:text-yellow-500">
              <li className=" md:items-start mb-2 ">
                Automates material and labour requirements
              </li>
              <li className=" md:items-start mb-2">
                Reduces the time to takeoff quantities from weeks to seconds
              </li>
              <li className=" items-start mb-2">Reduces overhead</li>
              <li className=" items-start mb-2">
                Curtails overpricing of labour and over-purchasing of materials
              </li>
              <li className=" items-start mb-2">
                Informs decision-making during the construction process
              </li>
              <li className="flex items-center mb-2">
                Helps with proper planning and forecasting during construction
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
      <Abouttwo />
      <Aboutagain />
      <Progress />
    </div>
  );
};

export default About;

// import React from "react";
// import Abouttwo from "./Abouttwo";
// import Progress from "./Progress";
// import { motion } from "framer-motion";

// // Define motion variants
// const imageVariants = {
//   hidden: { opacity: 0, x: -100 },
//   visible: { opacity: 1, x: 0, transition: { duration: 1 } },
// };

// const textVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
// };

// const About = () => {
//   return (
//     <div className="bg-tetiary">
//       <section className="body-font overflow-hidden">
//         <div className="mx-14 flex py-24 md:flex-row flex-col items-center">
//           {/* Image with motion */}
//           <motion.div
//             className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-16 md:mb-0"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.5 }}
//             variants={imageVariants}
//           >
//             <img
//               className="object-cover object-center rounded w-full h-96"
//               alt="hero"
//               src="/about.jpg"
//             />
//           </motion.div>

//           {/* Text content with motion */}
//           <motion.div
//             className="lg:flex-grow md:w-1/2 md:pl-20 flex flex-col md:items-start md:text-left items-center text-center"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.5 }}
//             variants={textVariants}
//           >
//             <h4 className="text-white font-bold mb-2">WHO WE ARE</h4>

//             <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
//               About Company
//             </h1>

//             <p className="mb-8 leading-relaxed font-bold md:mr-6 text-lg text-white">
//               Mauris porttitor vestibulum orci. Morbi eget libero ac tortor
//               fringilla faucibus. Cras dolor. Integer sapien.
//             </p>

//             <p className="mb-8 leading-relaxed md:mr-6 text-white">
//               Whether you are building a new office or are updating your
//               ventilations, you can count on us for professional and affordable
//               services. We work with you to ensure your new vent systems are
//               repaired or installed.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Additional Sections */}
//       <Abouttwo />
//       <Progress />
//     </div>
//   );
// };

// export default About;
