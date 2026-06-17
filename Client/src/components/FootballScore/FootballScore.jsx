import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { getFootballScores } from '../../api/userapis';
import ScoreCard from './ScoreCard';

const FootballScore = () => {
  const [liveFootball, setLiveFootball] = useState([]);
  const [completedFootball, setCompletedFootball] = useState([]);

  const printScorecard = async () => {
    try {
      const result = await getFootballScores();
      setLiveFootball(result.data.filter((item) => item.completed === "no").reverse());
      setCompletedFootball(result.data.filter((item) => item.completed === "yes").reverse());
    } catch (error) {
      console.error("Failed to fetch football scores", error);
    }
  };

  useEffect(() => {
    printScorecard();
    // Refresh every 45 seconds for live updates
    const interval = setInterval(printScorecard, 45000);
    return () => clearInterval(interval);
  }, []);

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 space-y-16">
      {/* Live Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-black text-white italic">LIVE <span className="text-red-600 underline decoration-2 underline-offset-8">FOOTBALL</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-red-600/50 to-transparent"></div>
        </div>
        
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {liveFootball.length > 0 ? (
              liveFootball.map((score, index) => (
                <ScoreCard key={score._id || index} score={score} isLive={true} />
              ))
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 italic">No live football matches currently.</motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* History Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-black text-white italic">RECENT <span className="text-gray-600 underline decoration-2 underline-offset-8">RESULTS</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-600/50 to-transparent"></div>
        </div>

        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-8"
        >
          {completedFootball.length > 0 ? (
            completedFootball.map((score, index) => (
              <ScoreCard key={score._id || index} score={score} isLive={false} />
            ))
          ) : (
            <p className="text-gray-500 italic">No historical records found.</p>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default FootballScore;