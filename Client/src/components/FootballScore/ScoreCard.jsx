import { motion } from "motion/react";

const ScoreCard = ({ score, isLive }) => {
  // Determine who won/is winning to dim the losing team (only after FT)
  const t1Goals = parseInt(score.team1_goals) || 0;
  const t2Goals = parseInt(score.team2_goals) || 0;
  const t1Highlight = isLive ? true : t1Goals >= t2Goals;
  const t2Highlight = isLive ? true : t2Goals >= t1Goals;

  const cardVars = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <motion.div
      variants={cardVars}
      layout
      className={`relative w-full max-w-[440px] bg-gradient-to-br ${
        isLive ? 'from-white/10 to-red-900/20' : 'from-white/10 to-gray-900/40'
      } backdrop-blur-lg text-white rounded-2xl shadow-2xl p-4 md:p-6 border border-white/10 overflow-hidden`}
    >
      {/* Decorative background glow for live matches */}
      {isLive && (
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 blur-3xl rounded-full" />
      )}

      {/* Match Header */}
      <h2 className={`text-center text-xs md:text-sm font-black uppercase tracking-widest mb-4 md:mb-6 ${
        isLive ? 'text-yellow-400' : 'text-green-400'
      }`}>
        {score.match_type || "Football Match"}
      </h2>

      {/* Desktop Layout (Horizontal) / Mobile Layout (Stacked) */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 md:gap-2 mb-4 md:mb-6">
        
        {/* TEAM 1 */}
        <div className="flex flex-row md:flex-col items-center justify-between md:justify-start w-full md:w-auto md:flex-1 bg-white/5 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none">
          <div className="flex items-center gap-3 md:flex-col">
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                src={score.team1_logo}
                alt={score.team1_name}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white/20 shadow-md"
              />
            </div>
            <span className={`font-bold text-sm md:mt-3 text-left md:text-center md:h-10 line-clamp-1 md:line-clamp-2 ${t1Highlight ? "text-white" : "text-white/50"}`}>
              {score.team1_name}
            </span>
          </div>
          
          {/* Mobile Only Score */}
          <div className={`md:hidden text-3xl font-black tabular-nums ${t1Highlight ? "text-white" : "text-white/50"}`}>
            {score.team1_goals}
          </div>
        </div>

        {/* Center Score (Desktop Only) */}
        <div className="hidden md:flex flex-col items-center justify-center pt-2">
          <div className="text-4xl md:text-5xl font-black tracking-tighter text-white tabular-nums">
            {score.team1_goals}<span className="text-white/30 mx-2">:</span>{score.team2_goals}
          </div>
          <div className="mt-3 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {isLive ? "In Progress" : "Full Time"}
          </div>
        </div>

        {/* Mobile VS / Time Badge */}
        <div className="md:hidden w-full flex justify-center -my-3 z-10">
          <div className="bg-[#1a1a1a] border border-white/10 px-3 py-0.5 rounded-full text-[9px] font-bold text-gray-500 shadow-lg">
            {isLive ? "LIVE" : "FT"}
          </div>
        </div>

        {/* TEAM 2 */}
        <div className="flex flex-row md:flex-col items-center justify-between md:justify-start w-full md:w-auto md:flex-1 bg-white/5 md:bg-transparent p-3 md:p-0 rounded-xl md:rounded-none">
          <div className="flex items-center gap-3 md:flex-col">
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.1, rotate: -5 }}
                src={score.team2_logo}
                alt={score.team2_name}
                className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white/20 shadow-md"
              />
            </div>
            <span className={`font-bold text-sm md:mt-3 text-left md:text-center md:h-10 line-clamp-1 md:line-clamp-2 ${t2Highlight ? "text-white" : "text-white/50"}`}>
              {score.team2_name}
            </span>
          </div>

          {/* Mobile Only Score */}
          <div className={`md:hidden text-3xl font-black tabular-nums ${t2Highlight ? "text-white" : "text-white/50"}`}>
            {score.team2_goals}
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className={`flex items-center justify-center gap-2 pt-3 md:pt-4 border-t border-white/5 ${
        isLive ? 'text-red-400' : 'text-gray-400'
      }`}>
        {isLive ? (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold uppercase animate-pulse">Live – In Progress</span>
          </>
        ) : (
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-tighter italic">Match Finished</span>
        )}
      </div>
    </motion.div>
  );
};

export default ScoreCard;