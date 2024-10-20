"use client";
import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

const ProgressSection = () => {
  const [startCount, setStartCount] = useState(false);

  // States to hold progress values for each bar
  const [renovationProgress, setRenovationProgress] = useState(0);
  const [remodelingProgress, setRemodelingProgress] = useState(0);
  const [consultationProgress, setConsultationProgress] = useState(0);

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      setStartCount(true);
      // Start the progress bar animations when in view
      animateProgress();
    }
  }, [isInView]);

  const animateProgress = () => {
    // Smoothly increment the progress values from 0 to target percentages
    let renovationTarget = 79;
    let remodelingTarget = 75;
    let consultationTarget = 50;

    let interval = setInterval(() => {
      setRenovationProgress((prev) =>
        prev < renovationTarget ? prev + 1 : renovationTarget
      );
      setRemodelingProgress((prev) =>
        prev < remodelingTarget ? prev + 1 : remodelingTarget
      );
      setConsultationProgress((prev) =>
        prev < consultationTarget ? prev + 1 : consultationTarget
      );

      if (
        renovationProgress === renovationTarget &&
        remodelingProgress === remodelingTarget &&
        consultationProgress === consultationTarget
      ) {
        clearInterval(interval); // Stop the animation once all progress bars are full
      }
    }, 20); // Adjust the speed of animation by changing the interval time
  };

  return (
    <section className="">
      <div className="  lg:gap-10 xl:gap-0  md:pb-20">

        <motion.div
          className="lg:mt-0 lg:col-span-7 justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mt-8 overflow-hidden "
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            ref={ref}
          >
            <div className="flex flex-col md:flex-row justify-between w-full">
              {/* First Segment */}
              <div className="flex flex-col items-center pl-4 pr-4 w-full md:p-0 p-4 md:w-1/3">
                <h2 className="text-4xl md:text-5xl font-bold text-yellow-700">
                  {startCount && <CountUp end={780} duration={2.5} />}
                </h2>
                <p className="text-base md:text-[12px] font-semibold">
                  Automated Calculations
                </p>
              </div>

              {/* Second Segment */}
              <div className="flex flex-col items-center pl-4 pr-4 w-full md:w-1/3 md:p-0 p-4">
                <h2 className="text-4xl md:text-5xl font-bold text-yellow-700">
                  {startCount && <CountUp end={39} duration={2.5} />}
                </h2>
                <p className="text-base md:text-[12px] font-semibold">
                  Custom Calculations
                </p>
              </div>

              {/* Third Segment */}
              <div className="flex flex-col items-center pl-4 pr-4 w-full md:w-1/3 md:p-0 p-4">
                <h2 className="text-4xl md:text-5xl font-bold text-yellow-700">
                  {startCount && <CountUp end={835} duration={2.5} />}
                </h2>
                <p className="text-base md:text-[12px] font-semibold">
                  Budget Calculations
                </p>
              </div>

              <div className="flex flex-col items-center pl-4 pr-4 w-full md:w-1/3 md:p-0 p-4 ">
                <h2 className="text-4xl md:text-5xl font-bold text-yellow-700">
                  {startCount && <CountUp end={97} duration={2.5} />}
                </h2>
                <p className="text-base md:text-[12px] font-semibold">
                  Cost Tracker
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgressSection;
