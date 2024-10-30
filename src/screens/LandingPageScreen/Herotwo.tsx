"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const HeroReal = () => {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/bgimage.jpeg)" }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {/* Darker black overlay */}
        <div className="absolute inset-0 bg-black opacity-90"></div>
      </motion.div>
      <div className="relative md:h-auto h-auto">
        <motion.div
          className="rounded-lg p-5 md:p-12 lg:mb-8 max-w-screen-2xl mx-auto text-center z-10 mt-20 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Fade and scale animation for the main title */}
          <motion.h1
            className="text-white dark:text-white lg:text-[65px] text-[30px] font-black mb-2 md:mt-[15px] lg:mt-[15px] leading-tight md:text-center text-start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            Estimate and Build.
          </motion.h1>

          {/* Fade and slide animation for the subheading */}
          <motion.h1
            className="md:block hidden text-white font-sans dark:text-white text-xl font-black mb-2 leading-tight text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Quick and easy construction solution that gives you estimated
            quantities of your <br /> material and labour requirements.
          </motion.h1>

          <motion.h1
            className="text-white md:hidden block md:text-[30px] font-bold text-2sm mb-2 leading-tight md:text-center text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Quick and easy construction solution that gives you estimated
            quantities of your material and labour requirements.
          </motion.h1>

          {/* Buttons with fade-in and hover animations */}
          {/* <motion.div
            className="flex md:justify-center justify-start items-center md:gap-4 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#FFD700" }}
              className="text-white md:text-2sm text-sm mt-5 md:mt-7 md:py-3 py-2 md:px-6 px-3 font-bold rounded-lg border border-gray-500 hover:border-yellow-800 hover:text-black hover:bg-yellow-700"
            >
              Automated
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#FFD700" }}
              className="text-white md:text-2sm text-sm md:px-6 px-3 mt-5 md:mt-7 md:py-3 py-2 font-bold rounded-lg border border-gray-500 hover:border-yellow-800 hover:text-black"
            >
              Custom & Budget Calculator
            </motion.button>
          </motion.div> */}

          <motion.div
            className="flex md:justify-center justify-start items-center md:gap-4 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <button className="text-white md:text-2sm text-sm mt-5 md:mt-7 md:py-3 py-2 md:px-6 px-3 font-bold rounded-lg border border-gray-500 hover:border-yellow-800  hover:bg-yellow-800 transform hover:scale-105 duration-300">
              Automated
            </button>

            <button className="text-white md:text-2sm text-sm md:px-6 px-3 mt-5 md:mt-7 md:py-3 py-2 font-bold rounded-lg border border-gray-500 hover:border-yellow-800 hover:bg-yellow-800 transform hover:scale-105 duration-300">
              Custom & Budget Calculator
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroReal;

// "use client";
// import React from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";

// const HeroReal = () => {
//   return (
//     <div className="relative overflow-hidden">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{ backgroundImage: "url(/bgimage.jpeg)" }}
//       >
//         {/* Darker black overlay */}
//         <div className="absolute inset-0 bg-black opacity-90"></div>
//       </div>
//       <div className="relative md:h-auto h-auto">
//         <div className="rounded-lg p-5 md:p-12 lg:mb-8 max-w-screen-2xl mx-auto text-center  z-10 mt-20 mb-6">
//           {/* Fade-in animation for the main title */}
//           <h1
//             className="text-white dark:text-white lg:text-[65px] text-[30px] font-black mb-2 md:mt-[15px] lg:mt-[15px] leading-tight md:text-center text-start"
//             // initial={{ opacity: 0 }}
//             // animate={{ opacity: 1 }}
//             // transition={{ duration: 1 }}
//           >
//             Estimate and Build.
//           </h1>

//           {/* Fade-in animation for the subheading */}
//           <h1
//             className="md:block hidden text-white font-sans dark:text-white  text-xl font-black mb-2 leading-tight text-center"
//             // initial={{ opacity: 0, y: 50 }}
//             // animate={{ opacity: 1, y: 0 }}
//             // transition={{ duration: 1, delay: 1 }}
//           >
//             Quick and easy construction solution that gives you estimated
//             quantities of your <br /> material and labour requirements.
//           </h1>

//           <h1
//             className="text-white md:hidden block md:text-[30px] font-bold text-2sm mb-2 leading-tight md:text-center text-left"
//             // initial={{ opacity: 0, y: 50 }}
//             // animate={{ opacity: 1, y: 0 }}
//             // transition={{ duration: 1, delay: 1 }}
//           >
//             Quick and easy construction solution that gives you estimated
//             quantities of your material and labour requirements.
//           </h1>

//           {/* Buttons with hover effect */}
//           <div
//             // initial={{ opacity: 0, y: 50 }}
//             // animate={{ opacity: 1, y: 0 }}
//             // transition={{ duration: 1, delay: 2 }}
//             className="flex md:justify-center justify-start iterm-center md:gap-4 gap-2"
//           >
//             {/* <Link
//               href="/"
//               className="transform border  border-grey-500 hover:border-yellow-700   hover:scale-105 duration-500 ease-in-out inline-flex mt-5 md:mt-7 justify-center items-center py-2.5 md:px-5 px-1 text-[16px] md:font-medium text-center text-black rounded-lg bg-white focus:ring-4 focus:ring-yellow-700 dark:focus:ring-yellow-700 hover:bg-gradient-to-r from-yellow-700 to-yellow-700 hover:text-white transition-all"
//             >
//               Automated
//             </Link> */}

//             <button className="text-white md:text-2sm text-sm mt-5 md:mt-7 md:py-3 py-2 md:px-6 px-3 font-bold rounded-lg hover:bg-yellow-800 border hover:text-white  hover:border-yellow-800">
//               Automated
//             </button>

//             <button className="text-white md:text-2sm text-sm md:px-6 px-3 mt-5 md:mt-7 md:py-3 py-2 font-bold rounded-lg hover:bg-yellow-800 border hover:text-white  hover:border-yellow-800">
//               Custom & Budget Calculator
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroReal;
