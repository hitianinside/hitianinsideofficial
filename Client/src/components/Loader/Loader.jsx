import React from 'react';
import { motion } from 'motion/react';

const Loader = () => {
  // Config for the animation
  const containerSize = "w-12 h-12";
  const numDots = 8;
  const animationDuration = 1.2;

  // Create an array of dots
  const dots = Array.from({ length: numDots });

  // Container variants - creates the gentle floating/spinning effect
  const containerVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        rotate: {
          duration: 8,
          ease: "linear",
          repeat: Infinity,
        },
      },
    },
  };

  // Dot variants - handles the pulsing size and opacity
  const dotVariants = {
    animate: (custom) => ({
      scale: [0, 1, 0],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: animationDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: custom * (animationDuration / numDots), // Staggers the animation perfectly
      },
    }),
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <motion.div
        className={`relative flex items-center justify-center ${containerSize}`}
        variants={containerVariants}
        animate="animate"
      >
        {dots.map((_, index) => {
          // Calculate the rotation angle for each dot to form a circle
          const rotationAngle = (360 / numDots) * index;
          
          return (
            <div
              key={index}
              className="absolute w-full h-full flex items-center justify-start"
              style={{ transform: `rotate(${rotationAngle}deg)` }}
            >
              <motion.div
                custom={index}
                variants={dotVariants}
                animate="animate"
                className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.6)]"
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Loader;