import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getBasketballScores } from '../../api/userapis';
import ScoreCard from './ScoreCard';

const BasketballScore = () => {
  const [liveBasketball, setLiveBasketball] = useState([]);
  const [completedBasketball, setCompletedBasketball] = useState([]);

  const printScorecard = async () => {
    try {
      const result = await getBasketballScores();
      setLiveBasketball(result.data.filter((item) => item.completed === "no").reverse());
      setCompletedBasketball(result.data.filter((item) => item.completed === "yes").reverse());
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  useEffect(() => {
    printScorecard();
    const interval = setInterval(printScorecard, 60000);
    return () => clearInterval(interval);
  }, []);

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="px-3 py-6 sm:p-8 max-w-7xl mx-auto space-y-10">

      {/* Live Section */}
      <section>
        <div className="flex items-center gap-4 mb-6 md:mb-8 px-2 md:px-0">
          <h2 className="text-xl md:text-2xl font-black text-white italic">LIVE <span className="text-red-500 underline decoration-2 underline-offset-8 uppercase">Basketball</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-red-500/50 to-transparent"></div>
        </div>

        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"
        >
          <AnimatePresence>
            {liveBasketball.length > 0 ? (
              liveBasketball.map((score, index) => (
                <ScoreCard key={score._id || index} score={score} isLive={true} />
              ))
            ) : (
              <p className="text-white/40 italic text-sm pl-4 col-span-full">No matches currently in progress...</p>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Completed Section */}
      <section>
        <div className="flex items-center gap-4 mb-6 md:mb-8 px-2 md:px-0">
          <h2 className="text-xl md:text-2xl font-black text-white italic">RECENT <span className="text-gray-500 underline decoration-2 underline-offset-8">RESULTS</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-500/50 to-transparent"></div>
        </div>

        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5"
        >
          {completedBasketball.length > 0 ? (
            completedBasketball.map((score, index) => (
              <ScoreCard key={score._id || index} score={score} isLive={false} />
            ))
          ) : (
            <p className="text-white/40 italic text-sm pl-4 col-span-full">No completed matches found.</p>
          )}
        </motion.div>
      </section>

    </div>
  );
};

export default BasketballScore;