"use client";

import { FiArrowRightCircle } from "react-icons/fi";

const Subservices = () => {
  const cards = [
    {
      title: "Automated Building Estimator",
      description:
        "This Automated Building Estimator will give you quick estimates of materials and labour requirements you will need for different elements such as; Concrete works, Formwork/Carpentary works, Tiling works, Reinforcement works, Damp proof courses, Filing works, Excavation works, Blockwork, Plastering works, Screeding works.",
      link: "Get Started",
    },
    {
      title: "Custom Building Estimator and Building Budget Calculator",
      description:
        "This custom building estimator will give you Bespoke/custom material and labour requirements of either an element of your construction work or your entire construction project or generally a bespoke item of work by uploading your drawings and inputting any other relevant information.",
      link: "Get Started",
    },
    {
      title: "Construction inventory and cost tracker",
      description:
        "Use our construction inventory and cost tracker to get real time updates of the finances of your construction project (Expenditure Analysis) - Amount budgeted versus actual amount expended on material and labour.",
      link: "Get Started",
    },
    {
      title: "Tradesmen and construction vendors log",
      description:
        "Get verified and reliable construction vendors and tradesmen for your construction project. Maybe; Tradesmen-Carpenters, Electricians, Painters etc. Construction Vendors-Construction tools supplier, Cement suppliers, Sand, Granite/Hardcore suppliers etc.",
      link: "Get Started",
    },
    {
      title: "Applicable Material and Labour Pricelist/Rates",
      description:
        "Get applicable material and labour pricelists and rates. Labour rates may include either daily rates or area and volume rates (per Lin.m, per m² and per m³) and both material and labour rates differ per geo-location.",
      link: "Get Started",
    },
    {
      title: "Construction Events and Workshop",
      description:
        "Get on trending construction events and workshops around your geo-location.",
      link: "Get Started",
    },
  ];

  return (
    <div className="relative bg-cover bg-center overflow-hidden" style={{ backgroundImage: 'url("/benifit.png")' }}>
      {/* The white overlay on the background */}
      <div className="absolute inset-0 bg-white opacity-95 z-0"></div>
      
      <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 md:mb-10 md:mt-20 mt-10 relative text-center md:mx-0 z-10">
        Explore Our Services
      </h2>

      <div className="flex justify-center pb-12 pt-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:mx-0 mx-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="max-w-sm bg-white border rounded-lg shadow-lg dark:bg-gray-800 p-6 hover:shadow-2xl transition-all duration-300 z-10"
            >
              <h5 className="mb-2 text-xl font-semibold tracking-tight text-black">
                {card.title}
              </h5>
              <p className="mb-3 font-normal text-black dark:text-gray-300">
                {card.description}
              </p>
              <a
                href="#"
                className="inline-flex transform hover:scale-105 items-center font-extrabold text-yellow-700 hover:underline"
              >
                {card.link}
                <FiArrowRightCircle className="w-4 h-4 ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subservices;
