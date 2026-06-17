import React, { useEffect, useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import { motion, AnimatePresence } from "motion/react";
import { getEvents } from "../../api/userapis";

const OurEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const { data } = await getEvents();
        setEvents(data.reverse());
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    },
  };

  return (
    <div className="bg-transparent py-8 px-4 overflow-hidden">
      {/* Animated Heading */}
      <motion.div
        initial={{ opacity: 0, letterSpacing: "-0.05em" }}
        animate={{ opacity: 1, letterSpacing: "0.02em" }}
        transition={{ duration: 1 }}
        className="text-center mb-5"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-[#fdd0d0] font-hammersmith leading-none uppercase">
          Our <span className="text-[#d03c19]">Events</span>
        </h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          className="h-1 bg-[#d03c19] mx-auto mt-4 rounded-full"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          /* Enhanced Skeleton Grid */
          <div className="flex flex-wrap justify-center gap-10">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-[350px] h-[550px] bg-white/5 rounded-3xl border border-white/10 animate-pulse overflow-hidden">
                <div className="h-[70%] bg-white/10" />
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-white/10 rounded w-3/4" />
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center items-center gap-12"
          >
            <AnimatePresence>
              {events.map((event, index) => (
                event.insta_url && (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ 
                      y: -15, 
                      rotateZ: index % 2 === 0 ? 1 : -1,
                      transition: { duration: 0.3 }
                    }}
                    className="relative group bg-white/5 backdrop-blur-md border border-white/10 w-full max-w-[360px] rounded-2xl shadow-2xl overflow-hidden"
                  >
                    {/* Glowing background effect on hover */}
                    <div className="absolute inset-0 bg-[#d03c19]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative p-4 h-[480px] overflow-hidden rounded-t-[2rem]">
                      <InstagramEmbed
                        url={event.insta_url}
                        width="100%"
                        className="rounded-2xl"
                      />
                    </div>

                    <div className="relative p-8 pt-2">
                      <div className="space-y-1">
                        {/* <p className="text-[#fdd0d0]/60 text-xs font-bold uppercase tracking-widest">Event Name</p> */}
                        <h3 className="text-white text-xl font-bold truncate">{event.event_name}</h3>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-[#fdd0d0] text-3xl font-light italic">The stage is currently quiet...</h2>
            <p className="text-white/50 mt-2">Check back soon for new events!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OurEvents;