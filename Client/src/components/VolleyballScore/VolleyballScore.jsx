import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getVolleyballScores } from '../../api/userapis';
import ScoreCard from './ScoreCard';

const VolleyballScore = () => {
  const [liveVolleyball, setLiveVolleyball] = useState([]);
  const [completedVolleyball, setCompletedVolleyball] = useState([]);

  const printScorecard = async () => {
    try {
      const result = await getVolleyballScores();
      setLiveVolleyball(result.data.filter((item) => item.completed === "no").reverse());
      setCompletedVolleyball(result.data.filter((item) => item.completed === "yes").reverse());
    } catch (error) {
      console.error("Score fetch failed", error);
    }
  };

  useEffect(() => {
    printScorecard();
    const interval = setInterval(printScorecard, 45000); // Auto-refresh every 45s
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-10 space-y-12 max-w-7xl mx-auto">
      {/* Live Matches Section */}
      <section>
        <div className="flex items-center gap-4 mb-8 uppercase italic font-extrabold">
          <h2 className="text-2xl text-white">Live <span className="text-red-600 underline decoration-2 underline-offset-8">Volleyball</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-red-400/50 to-transparent"></div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center sm:justify-items-start"
        >
          <AnimatePresence mode='popLayout'>
            {liveVolleyball.length > 0 ? (
              liveVolleyball.map((score, index) => (
                <ScoreCard key={score._id || index} score={score} isLive={true} />
              ))
            ) : (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-400 italic">No games currently active.</motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Completed Matches Section */}
      <section>
        <div className="flex items-center gap-4 mb-8 uppercase font-extrabold italic">
          <h2 className="text-2xl text-white">Recent <span className="text-slate-500 underline decoration-2 underline-offset-8">Results</span></h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-500/50 to-transparent"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center sm:justify-items-start"
        >
          {completedVolleyball.length > 0 ? (
            completedVolleyball.map((score, index) => (
              <ScoreCard key={score._id || index} score={score} isLive={false} />
            ))
          ) : (
            <p className="text-slate-500 italic">No match history found.</p>
          )}
        </motion.div>
      </section>
    </div>
  );
};

export default VolleyballScore;