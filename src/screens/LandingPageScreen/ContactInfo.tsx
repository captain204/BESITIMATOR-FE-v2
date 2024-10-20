import { motion } from 'framer-motion';
import {
  AiOutlineClockCircle,
  AiOutlineEnvironment,
  AiOutlinePhone,
  AiOutlineMail,
} from 'react-icons/ai';

const WorkTogetherSection = () => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2, // Delay for staggering effect
        duration: 0.5,
      },
    }),
  };

  return (
    <section className="bg-primary text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold uppercase text-white">LET'S WORK TOGETHER</h2>
          <p className="mt-2 text-white">office@bold-themes.com</p>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Working Hours */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            custom={0}
            className="flex items-start space-x-4"
          >
            <AiOutlineClockCircle className="text-5xl text-black hover:text-white" />
            <div>
              <h4 className="text-lg font-semibold text-white ">WORKING HOURS</h4>
              <p className='text-white'>Mon - Sat 8.00 - 18.00</p>
              <p className='text-black'>Sunday CLOSED</p>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            custom={1}
            className="flex items-start space-x-4"
          >
            <AiOutlineEnvironment className="text-5xl text-black hover:text-white" />
            <div>
              <h4 className="text-lg font-semibold text-white">LOCATION</h4>
              <p className='text-white'>1010 Avenue, New York</p>
              <p className='text-white'>NY 10018 US</p>
            </div>
          </motion.div>

          {/* Call Center */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            custom={2}
            className="flex items-start space-x-4"
          >
            <AiOutlinePhone className="text-5xl text-black hover:text-white" />
            <div>
              <h4 className="text-lg font-semibold text-white">CALL CENTER</h4>
              <p className='text-white'>1-800-700-600</p>
              <p className='text-white'>Give us a free call 24/7</p>
            </div>
          </motion.div>

          {/* Write Us */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            custom={3}
            className="flex items-start space-x-4"
          >
            <AiOutlineMail className="text-5xl text-black hover:text-white" />
            <div>
              <h4 className="text-lg font-semibold text-white">WRITE US</h4>
              <p className='text-white'>office@bold-themes.com</p>
              <p className='text-white'>support@bold-themes.com</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorkTogetherSection;

















// import { AiOutlineClockCircle, AiOutlineEnvironment, AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';

// const WorkTogetherSection = () => {
//   return (
//     <section className="bg-primary text-white py-16 px-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Title */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold uppercase text-white">LET'S WORK TOGETHER</h2>
//           <p className="mt-2 text-white">office@bold-themes.com</p>
//         </div>

//         {/* Info Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//           {/* Working Hours */}
//           <div className="flex items-start space-x-4">
//             <AiOutlineClockCircle className="text-5xl text-black hover:text-white" />
//             <div>
//               <h4 className="text-lg font-semibold text-white ">WORKING HOURS</h4>
//               <p className='text-white'>Mon - Sat 8.00 - 18.00</p>
//               <p className='text-black'>Sunday CLOSED</p>
//             </div>e
//           </div>

//           {/* Location */}
//           <div className="flex items-start space-x-4">
//             <AiOutlineEnvironment className="text-5xl text-black hover:text-white" />
//             <div>
//               <h4 className="text-lg font-semibold text-white">LOCATION</h4>
//               <p className='text-white'>1010 Avenue, New York</p>
//               <p className='text-white'>NY 10018 US</p>
              
//             </div>
//           </div>

//           {/* Call Center */}
//           <div className="flex items-start space-x-4">
//             <AiOutlinePhone className="text-5xl text-black hover:text-white" />
//             <div>
//               <h4 className="text-lg font-semibold text-white">CALL CENTER</h4>
//               <p className='text-white'>1-800-700-600</p>
//               <p className='text-white'>Give us a free call 24/7</p>
//             </div>
//           </div>

//           {/* Write Us */}
//           <div className="flex items-start space-x-4">
//             <AiOutlineMail className="text-5xl text-black hover:text-white" />
//             <div>
//               <h4 className="text-lg font-semibold text-white">WRITE US</h4>
//               <p className='text-white'>office@bold-themes.com</p>
//               <p className='text-white'>support@bold-themes.com</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WorkTogetherSection;
