import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { getCricketScores } from '../../api/userapis';
import ScoreCard from './ScoreCard';

const CricketScore = () => {
  const [liveCricket, setLiveCricket] = useState([]);
  const [completedCricket, setCompletedCricket] = useState([]);

  const printScorecard = async () => {
    try {
      const result = await getCricketScores();
      setLiveCricket(result.data.filter((item) => item.completed === "no").reverse());
      setCompletedCricket(result.data.filter((item) => item.completed === "yes").reverse());
    } catch (error) {
      console.error("Score fetch failed", error);
    }
  };

  useEffect(() => {
    printScorecard();
    const interval = setInterval(printScorecard, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      className="p-2 sm:p-4 md:p-8 space-y-10 md:space-y-12 max-w-7xl mx-auto"
    >
      {/* Live Section */}
      <section>
        <div className="flex items-center gap-4 mb-6 md:mb-8 px-2 md:px-0">
          <h2 className="text-xl md:text-2xl font-black text-white italic">LIVE <span className="text-red-500 underline decoration-2 underline-offset-8 uppercase">Cricket</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-red-500/50 to-transparent"></div>
        </div>
        
        <div className="flex flex-wrap gap-4 md:gap-8">
          <AnimatePresence mode="popLayout">
            {liveCricket.length > 0 ? (
              liveCricket.map((score, index) => (
                <ScoreCard key={score._id || index} score={score} isLive={true} />
              ))
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 italic px-4">No live cricket matches at the moment.</motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Completed Section */}
      <section>
        <div className="flex items-center gap-4 mb-6 md:mb-8 px-2 md:px-0">
          <h2 className="text-xl md:text-2xl font-black text-white italic">RECENT <span className="text-gray-500 underline decoration-2 underline-offset-8">RESULTS</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-500/50 to-transparent"></div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-8">
          {completedCricket.length > 0 ? (
            completedCricket.map((score, index) => (
              <ScoreCard key={score._id || index} score={score} isLive={false} />
            ))
          ) : (
            <p className="text-gray-500 italic px-4">No recent results found.</p>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default CricketScore;