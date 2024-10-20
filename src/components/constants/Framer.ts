import { Variants } from "framer-motion";

export const rightVariants: Variants = {
    hide: {
      opacity: 0,
      x: 250,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        type: "tween",
        ease: "easeInOut",
      },
    },
  };
  
 export const leftVariants: Variants = {
    hide: {
      opacity: 0,
      x: -250,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        type: "tween",
        ease: "easeInOut",
      },
    },
  };

  export const fadeInVariants: Variants = {
    hide: {
      opacity: 0,
      x: 0,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        type: "tween",
        ease: "easeInOut",
      },
    },
  };




  export const typingEffect = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 1.5,
        type: "tween",
        ease: "easeInOut",
      },
    },
  };
  



  export const bottomToTopVariants: Variants = {
    hide: {
      opacity: 0,
      y: 250,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        type: "tween",
        ease: "easeInOut",
      },
    },
  };
  
  export const topToBottomVariants: Variants = {
    hide: {
      opacity: 0,
      y: -250,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        type: "tween",
        ease: "easeInOut",
      },
    },
  };
  
