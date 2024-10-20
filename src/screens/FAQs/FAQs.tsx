"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "How was the Building Estimator created ?",
      answer: (
        <div>
          <p className="text-white">
            Quantity Surveyors with a vast amount of industry years and practice
            have collected construction data from work activities on site,
            refined the data as much as possible by testing the collected data
            in different situations and scenarios. Further to this, the refined
            data have been put together to create The Building Estimator to help
            your day to day construction life easy, simpler, faster and smarter.
          </p>
        </div>
      ),
    },
    {
      question: "What is an Estimate or an Estimator?",
      answer: (
        <div>
          <p className="text-white">
            An Estimate is an effort to project or forecast the likely
            expenditure or requirements for a certain construction project or a
            particular item of work (concrete, formwork etc.) as accurately as
            possible. An Estimator is a tool used to achieve this process. This
            may be used in for different construction projects such as a new
            building or remodeling/renovation projects. Getting construction
            estimates is an important practice to determine the expenditure you
            require for your project.
          </p>
        </div>
      ),
    },
    {
      question: "What is Girth?",
      answer: (
        <div className="flex flex-col justify-center items-center">
          <p className="mb-4 text-white">please see below:</p>
          <img
            src="/faq.png"
            alt="Our Services"
            className="w-96 h-auto rounded-lg shadow-lg"
          />
        </div>
      ),
    },

    {
      question: "What is Girth?",
      answer: (
        <div className="">
          <p className="mb-4 text-white">
            Linear metre is the length of a piece of material as it is (metre is
            the unit of measurement) and its total length is called Perimeter.
            For example, in the image below, which is say a room space the total
            sum of the lin.m(s) in this space which is otherwise called
            perimeter is:
          </p>

          <div className="flex justify-center">
            <img
              src="/faq2.jpg"
              alt="Our Services"
              className="w-96 h-auto rounded-lg shadow-lg"
            />
          </div>

          <h6 className="text-white text-start mt-4 font-bold">
            Calculation: 4.66m + 2.71m + 3.41m + 1.80m + 1.25m + 0.91m = 14.74m
          </h6>

          <p className=" text-white f">
            Explanation: The sum of each individual dimension (lin.m) which is
            4.66m, 2.71m, 3.41m, 1.80m, 1.25m and 0.91m has been totaled to give
            14.74m which is the perimeter. Perimeter or circumference of a
            circle = 2πr or πd
          </p>
        </div>
      ),
    },

    {
      question: "What is Linear Metre or Lin.M or m to Perimeter?",
      answer: (
        <div className="">
          <p className="mb-4 text-white">
            Linear metre is the length of a piece of material as it is (metre is
            the unit of measurement) and its total length is called Perimeter.
            For example, in the image below, which is say a room space the total
            sum of the lin.m(s) in this space which is otherwise called
            perimeter is:
          </p>

          <div className="flex justify-center">
            <img
              src="/faq2.jpg"
              alt="Our Services"
              className="w-96 h-auto rounded-lg shadow-lg"
            />
          </div>

          <h6 className="text-white text-start mt-4 font-bold">
            Calculation: 4.66m + 2.71m + 3.41m + 1.80m + 1.25m + 0.91m = 14.74m
          </h6>

          <p className=" text-white f">
            Explanation: The sum of each individual dimension (lin.m) which is
            4.66m, 2.71m, 3.41m, 1.80m, 1.25m and 0.91m has been totaled to give
            14.74m which is the perimeter. Perimeter or circumference of a
            circle = 2πr or πd
          </p>
        </div>
      ),
    },

    {
      question: (
        <>
          What is Square Area or Square metre or m<sup>2</sup>
        </>
      ),
      answer: (
        <div className="">
          <p className="mb-4 text-white">
            Metre is the unit of measurement but the square area of a place say
            the area for floor tiling is the length x the breadth of the
            proposed tiling space. See image below for proper understanding-
          </p>

          <div className="flex justify-center">
            <img
              src="/faq3.gif"
              alt="Our Services"
              className="w-96 h-auto rounded-lg shadow-lg"
            />
          </div>

          <p className=" text-white mt-4">
            as you can deduce from the image above m(metre) and cm(centimeter)
            are the units of measurements. Calculations/ Formulas for area
            differ from shape to shape. Area of a circle = πr2 Area of a
            trapezium =1/2 (a+b) h Area of a triangle = 1/2bh
          </p>
        </div>
      ),
    },

    {
      question: (
        <>
          What is Volume or Cubic Metre or m<sup>3</sup>
        </>
      ),
      answer: (
        <div className="">
          <p className="mb-4 text-white">
            Say you have a concrete cube, volume is Length x Breadth x Height
            please see image below; as earlier stated, metre is the unit of
            measurement.
          </p>

          <div className="flex justify-center">
            <img
              src="/faq4.png"
              alt="Our Services"
              className="w-96 h-auto rounded-lg shadow-lg"
            />
          </div>

          <p className=" text-white mt-4">
            Volume= Length (1m) x Breadth (1m) x height (1m) = 1m3. Hence the
            volume of the above concrete cube is 1m3. Calculations/ Formulas for
            volume differ from shape to shape. Volume of a cylinder = πr2h
            Volume of a Cone/pyramid = 1/3 πr2h
          </p>
        </div>
      ),
    },

    {
      question: "Converting from mm (Millimeter) to m (Metre)?",
      answer: (
        <div>
          <p className="text-white">
            You can use our Building Estimator Calculator as seen in the
            automated building estimator section otherwise, to convert from
            milimetre(mm) to Metres(m) = divide value by 1000, and from metre(m)
            to mm(Millimetres) – Multiply value by 1000.
          </p>

          <h6 className="text-white text-sm font-bold mt-3">
            For example, 1m to mm = 1000mm, 1mm to m = 0.001m
          </h6>
        </div>
      ),
    },

    {
      question: "What is Shoring?",
      answer: (
        <div>
          <p className="text-white">
            Shoring is a temporary support to an unsafe structure. In other
            words, shoring is a process of supporting a building, structure or
            trench temporarily to avoid it from collapse- otherwise known as
            earthwork support in foundation.
          </p>
        </div>
      ),
    },

    {
      question: "What is All elements in my contruction work?",
      answer: (
        <div>
          <p className="text-white">
            Elements in my construction work include; Foundation works, Frames –
            Columns and Beams, Staircase, Walls – Blockwork and Lintel, Roffing
            and Roof Covering, Windows and Doors, Plumbing and Mechanical
            Installation, Electrical Installation, Finishing Works, Painting and
            Decoration, Fittings and Fixtures and External Works. All of these
            mentioned compose of the elements in my construction work.
          </p>
        </div>
      ),
    },

    {
      question: "What is a Budget Calculator?",
      answer: (
        <div>
          <p className="text-white">
            The Building Estimators Budget Calculator, automatically tells you
            the approximate and probable cost of construction for your
            Residential construction, Commercial Construction and Fence
            construction. Just incase, you are not satisfied with the outcome of
            your budget calculator, you may request for a more accurate estimate
            by uploading your construction drawings and any other information
            you deem necessary.
          </p>
        </div>
      ),
    },

    {
      question:
        "What is the Process of using the Automated Building Estimator?",
      answer: (
        <div>
          <p className="text-white">
            To use our Automated Building Estimator, it is a simple process.
            First you need to sign in if you have an existing account and sign
            up if you do not. After which you will have access to a range of
            construction work items such as filling works, tiling works,
            formworks etc. All you have to do is select the work item you need
            an approximate estimate for, input the specifications of the item of
            work then submit. Then you automatically get your material and
            labour requirements for that item of work.
          </p>
        </div>
      ),
    },

    {
      question: "How does the Custom Estimator work?",
      answer: (
        <div>
          <p className="text-white">
            The custom Building estimator helps to cater for items you cannot
            use our automated building estimator and budget calculator for. The
            Custom Building Estimator will give you material and labour
            requirements for your construction work by uploading your drawings
            and or any other specifications important to create an accurate
            estimate for your work. Estimates are usually ready within 3-7
            working days and if urgent within 1-2 days.
          </p>
        </div>
      ),
    },

    {
      question:
        "How often are your material pricelists and labour pricelists updated?",
      answer: (
        <div>
          <p className="text-white">
            We carry out market surveys on construction materials weekly hence
            helping us refine the information we churn out to you. Hence, this
            pricelist is updated weekly.
          </p>
        </div>
      ),
    },

    {
      question: "How to be a Building Estimator advocate?",
      answer: (
        <div>
          <p className="text-white">
            Please send us an email on info@thebuildingestimator.com
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-tetiary my-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <button
              className="w-full flex justify-between items-center p-4 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-xl font-semibold">{faq.question}</span>
              <span>
                {activeIndex === index ? (
                  <FiMinus className="text-xl text-yellow-500" />
                ) : (
                  <FiPlus className="text-xl text-yellow-500" />
                )}
              </span>
            </button>

            {/* Answer section without animation */}
            {activeIndex === index && (
              <div className="mt-4 p-4 text-lg text-gray-700 rounded-lg shadow-lg">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
