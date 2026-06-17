import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getHomepageComponents } from '../../api/userapis';

const Banner = () => {
  const [homepageComponent, setHomepageComponent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef(null);

  const SLIDE_DURATION = 5000;

  useEffect(() => {
    const getPosters = async () => {
      try {
        const { data } = await getHomepageComponents();
        setHomepageComponent(data);
      } catch (err) {
        console.error("Error fetching banner:", err);
      } finally {
        setLoading(false);
      }
    };
    getPosters();
  }, []);

  const handleSlide = useCallback((newDirection) => {
    setDirection(newDirection === 'left' ? -1 : 1);
    setCurrentIndex((prevIndex) =>
      newDirection === 'left'
        ? (prevIndex === 0 ? homepageComponent.length - 1 : prevIndex - 1)
        : (prevIndex === homepageComponent.length - 1 ? 0 : prevIndex + 1)
    );
  }, [homepageComponent.length]);

  // Auto-play with reset on manual interaction
  useEffect(() => {
    if (homepageComponent.length === 0) return;
    timerRef.current = setInterval(() => handleSlide('right'), SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [handleSlide, currentIndex, homepageComponent.length]);

  // Variants for the sliding animation
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      transition: { opacity: { duration: 0.2 } }
    })
  };

  if(homepageComponent.length === 0){
    return "";
  }

  return (
    <div className="relative w-full p-4 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="text-center mb-5"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-[#fdd0d0] font-hammersmith uppercase tracking-tighter">
          The <span className="text-[#d03c19] drop-shadow-[0_0_15px_rgba(208,60,25,0.5)]">Spotlight</span>
        </h1>
      </motion.div>

      <div className="relative max-w-5xl md:max-w-3xl mx-auto group">
        {loading ? (
          <div className="w-full h-[400px] bg-white/5 rounded-[2.5rem] border border-white/10 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#d03c19] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          homepageComponent.length > 0 && <div className="relative h-[350px] md:h-[550px] w-full overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-black">

            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = offset.x;
                  if (swipe < -100) handleSlide('right');
                  else if (swipe > 100) handleSlide('left');
                }}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <a 
                  href={homepageComponent[currentIndex]?.event_form_link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="block h-full w-full relative group"
                >
                  <motion.img
                    src={homepageComponent[currentIndex]?.event_poster}
                    alt={homepageComponent[currentIndex]?.event_name}
                    className="w-full h-full object-fill pointer-events-none"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 3, ease: "linear" }}
                  />
                </a>
              </motion.div>
            </AnimatePresence>

            {/* Glass Navigation Controls */}
            <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(208, 60, 25, 1)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSlide('left')}
                className="w-14 h-14 pointer-events-auto flex items-center justify-center bg-black/30 backdrop-blur-xl text-white rounded-2xl border border-white/10 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(208, 60, 25, 1)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSlide('right')}
                className="w-14 h-14 pointer-events-auto flex items-center justify-center bg-black/30 backdrop-blur-xl text-white rounded-2xl border border-white/10 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </motion.button>
            </div>

            {/* Status Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
              {homepageComponent.length > 0 && homepageComponent.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className="group py-2"
                >
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-10 bg-[#d03c19]' : 'w-4 bg-white/20 group-hover:bg-white/50'}`} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;