import React from 'react';

const brands = [
  '/trust.jpg', // Replace with your brand logo paths
  '/trust2.png',
  '/trust3.png',
  '/trust4.png',
  '/trusted5.png',
  '/trust6.png',
  '/tust7.png',
];

const BrandsSection = () => {
  return (
    <section className="relative py-16 bg-cover bg-center" style={{ backgroundImage: 'url("/benifit.png")' }}>
      <div className="absolute inset-0 bg-white opacity-95"></div>
      <div className="relative container mx-auto px-8 lg:px-10 text-center">
        <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 mb-10">
          Brands That Trust Us
        </h2>
        {/* <p className="text-lg text-gray-700 mb-12">
          Join a community of trusted partners who rely on our expertise.
        </p> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 ">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex border justify-center items-center p-4 bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={brand}
                alt={`Brand Logo ${index + 1}`}
                className="h-32 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
