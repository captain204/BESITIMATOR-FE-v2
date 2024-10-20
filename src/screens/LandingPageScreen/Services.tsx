"use client";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Subservices from "./SubServices";
import { FiArrowRightCircle } from "react-icons/fi";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay:1
    },
  },
};




const Services = () => {
  const cardRefs = [useRef(null), useRef(null), useRef(null)];
  const isInView1 = useInView(cardRefs[0], { once: true });
  const isInView2 = useInView(cardRefs[1], { once: true });
  const isInView3 = useInView(cardRefs[2], { once: true });

  const cards = [
    {
      title: "Renovation",
      number: "01",
      description: "We specialize in whole home renovations and improvements.",
      services: ["Whole Home Renovation", "1st Floor Renovations", "Basement Finishing"],
      image: "/service.jpeg",
    },
    {
      title: "Remodeling",
      number: "02",
      description: "Transform your home with our professional remodeling services.",
      services: ["Kitchen Remodeling", "Bathroom Renovations", "Custom Additions"],
      image: "/service2.jpeg",
    },
    {
      title: "Consultation",
      number: "03",
      description: "Get expert advice and consultations for your renovation needs.",
      services: ["Initial Consultation", "Project Planning", "Budgeting Assistance"],
      image: "/service3.jpeg",
    },
  ];

  return (
    <div className="bg-tetiary overflow-hidden">
      <div className="flex flex-wrap justify-center gap-10">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            ref={cardRefs[index]}
            variants={cardVariants}
            initial="hidden"
            animate={isInView1 && index === 0 ? "visible" : isInView2 && index === 1 ? "visible" : isInView3 && index === 2 ? "visible" : "hidden"}
            className="w-96"
          >
            {/* Card */}
            <Card className="w-96 rounded-none bg-secondary">
              <CardBody>
                <Typography variant="h1" className="mb-2 text-white font-bold">
                  {card.number}
                </Typography>
                <Typography variant="h5" className="mb-2 text-white">
                  {card.title}
                </Typography>
                <Typography className="text-white mb-2">
                  {card.description}
                </Typography>
                <ul className="text-white list-disc pl-5 marker:text-yellow-500">
                  {card.services.map((service, i) => (
                    <li key={i}>{service}</li>
                  ))}
                </ul>
                <div className="pt-4 text-primary font-bold cursor-pointer flex justify-start items-center ">
                  Read More <FiArrowRightCircle className="w-4 h-4 ml-2 " />
                </div>
              </CardBody>
              <div className="relative h-80 md:mx-0 mx-6">
                <img
                  src={card.image}
                  alt={`card-image-${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      <Subservices />
    </div>
  );
};

export default Services;








// "use client";
// import { Card, CardBody, Typography} from "@material-tailwind/react";
// import Subservices from "./SubServices";

// const Services = () => {
//   return (
//     <div className=" bg-tetiary">
//       <div className="flex flex-wrap justify-center gap-10">
//         {/* Card 1 */}
//         <Card className="w-96 rounded-none bg-secondary">
//           <CardBody>
//           <Typography variant="h1" className="mb-2 text-white font-bold">
//               01
//             </Typography>
//             <Typography variant="h5" className="mb-2 text-white">
//               Renovation
//             </Typography>
//             <ul className="text-white list-disc pl-5">
//               <li>Whole Home Renovation</li>
//               <li>1st Floor Renovations</li>
//               <li>Basement Finishing</li>
//             </ul>
//             <div className="pt-4 text-primary font-bold cursor-pointer ">
//               Read More
//             </div>
//           </CardBody>
//           <div className="relative h-80   md:mx-0 mx-6">
//             <img
//               src="/service.jpeg"
//               alt="card-image-1"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </Card>

//         <Card className="w-96 rounded-none bg-secondary">
//           <CardBody>
//           <Typography variant="h1" className="mb-2 text-white font-bold">
//               02
//             </Typography>
//             <Typography variant="h5" className="mb-2 text-white">
//               Remodeling
//             </Typography>
//             <ul className="text-white list-disc pl-5">
//               <li>Whole Home Renovation</li>
//               <li>1st Floor Renovations</li>
//               <li>Basement Finishing</li>
//             </ul>
//             <div className="pt-4 text-primary font-bold cursor-pointer ">
//               Read More
//             </div>
//           </CardBody>
//           <div className="relative h-80 md:mx-0 mx-6">
//             <img
//               src="/service2.jpeg"
//               alt="card-image-2"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </Card>

//         <Card className="w-96 rounded-none bg-secondary">
//           <CardBody>
//           <Typography variant="h1" className="mb-2 text-white font-bold">
//               03
//             </Typography>
//             <Typography variant="h5" className="mb-2 text-white">
//               Consultation
//             </Typography>
//             <ul className="text-white list-disc pl-5">
//               <li>Whole Home Renovation</li>
//               <li>1st Floor Renovations</li>
//               <li>Basement Finishing</li>
//             </ul>
//             <div className="pt-4 text-primary font-bold cursor-pointer ">
//               Read More 
//             </div>
//           </CardBody>
//           <div className="relative h-80 md:mx-0 mx-6">
//             <img
//               src="/service3.jpeg"
//               alt="card-image-3"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </Card>
//       </div>
//       <Subservices />
//     </div>
//   );
// };

// export default Services;
