import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { getAlmanacs } from "../../api/userapis";

const BestOfAlmanac = () => {

  const [almanacs, setAlmanacs] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
  };

  //get all almanac
  useEffect(() => {
    const getAllAlmanacs = async () => {
      const { data } = await getAlmanacs();
      // console.log(data);
      setAlmanacs(data);
      setLoading(false)
    }

    getAllAlmanacs();
  }, [])

  return (
    <>
      <section
        className="Almanac-section bg-no-repeat bg-bottom bg-cover"
      // style={{ backgroundImage: `url(${almanac_background})` }}
      >
        <div className="bg-[#650808] pt-0 pb-5 text-center">
          <h1 className="text-[2rem] md:text-[2.5rem] uppercase text-[#f6c5c5] font-bold">Best of Almanac</h1>
        </div>


        {loading ?
          (
            <div className="flex flex-wrap justify-center gap-5 mt-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="w-48 h-48 bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] rounded-lg shimmer"
                ></div>
              ))}
            </div>
          )
          :
          almanacs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white text-xl py-10"
            >
              No Almanac Found
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-16 pb-10 flex flex-col items-center"
            >
              {almanacs.map((almanac, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="relative bg-[#d17f7f]/30 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl  transition-shadow duration-300 overflow-hidden border border-white/10 sm:max-w-[300px] max-sm:w-[90%]"
                >
                  <div className="overflow-hidden relative">
                    <motion.img
                      className="w-full h-[220px] object-cover p-3 rounded-t-2xl"
                      src={almanac.photo}
                      alt={`Artwork by ${almanac.username}`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>

                  <div className="px-5 py-4">
                    <p className="text-white font-semibold text-lg tracking-wide">
                      {almanac.username}
                    </p>
                    <p className="text-white/80 text-sm">{almanac.department}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
      </section>

      <style>
        {`
         @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
      
          .shimmer {
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite linear;
            }
        `}
      </style>
    </>
  )
}

export default BestOfAlmanac;
