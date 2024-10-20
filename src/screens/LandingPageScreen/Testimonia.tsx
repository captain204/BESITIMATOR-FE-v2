"use client";

import { Carousel } from "@material-tailwind/react";

const Testimonia = () => {
  return (
    <Carousel className="rounded-xl" autoplay loop={true}>
      {/* Testimonial 1 */}
      <section className="bg-secondary">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
          <figure className="max-w-screen-md mx-auto">
            <svg
              className="h-12 mx-auto mb-3 text-white dark:text-white"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-2xl font-medium text-white">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                consectetur nobis, hic atque nisi neque harum sint aliquid quo
                vel? Voluptatum unde asperiores sunt esse fugit similique
                perspiciatis odio minima!"
              </p>
            </blockquote>

            <figcaption className="flex flex-col justify-center items-center mt-6 space-y-3">
              <img
                className="w-14 h-14 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToonwNT4zbwCyq-k-qAzXexPn6URz3gT4BxQ&s"
                alt="profile picture"
              />
              <div className="text-center">
                <div className="font-medium text-white mb-2">
                  Pelumi Nurudeen
                </div>
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                  CEO at Build Estimator
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
          <figure className="max-w-screen-md mx-auto">
            <svg
              className="h-12 mx-auto mb-3 text-white"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-2xl font-medium text-white">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                consectetur nobis, hic atque nisi neque harum sint aliquid quo
                vel? Voluptatum unde asperiores sunt esse fugit similique
                perspiciatis odio minima!"
              </p>
            </blockquote>
            <figcaption className="flex flex-col justify-center items-center mt-6 space-y-3">
              <img
                className="w-14 h-14 rounded-full object-fill"
                src="https://static01.nyt.com/images/2022/04/04/us/politics/00dc-hblsa-lowres-20/00dc-hblsa-lowres-20-mobileMasterAt3x.jpg?auto=webp&quality=90"
                alt="profile picture"
              />
              <div className="text-center">
                <div className="font-medium text-white mb-2">Amaka Gough</div>
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                  CTO at Building Estimator
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Testimonial 3 */}
      <section className="bg-secondary">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
          <figure className="max-w-screen-md mx-auto">
            <svg
              className="h-12 mx-auto mb-3 text-white"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-2xl font-medium text-white">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                consectetur nobis, hic atque nisi neque harum sint aliquid quo
                vel? Voluptatum unde asperiores sunt esse fugit similique
                perspiciatis odio minima!"
              </p>
            </blockquote>
            <figcaption className="flex flex-col justify-center items-center mt-6 space-y-3">
              <img
                className="w-14 h-14 rounded-full object-fill"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRa7LV9l9ccFT4ufj9ly-OThG-lUlbm_LQpw&s"
                alt="profile picture"
              />
              <div className="text-center">
                <div className="font-medium text-white mb-2">Micheal Gough</div>
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Co-founder Building Estimator
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </Carousel>
  );
};

export default Testimonia;
