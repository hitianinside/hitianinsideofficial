import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Context
import { isAuthenticatedContext } from '../../context/context';

// Components
import CricketScore from '../../components/CricketScore/CricketScore';
import FootballScore from '../../components/FootballScore/FootballScore';
import VolleyballScore from "../../components/VolleyballScore/VolleyballScore";
import BasketballScore from '../../components/BasketballScore/BasketballScore';

const MatchesScores = () => {
  const router = useNavigate();
  const { isAuthenticated } = useContext(isAuthenticatedContext);

  // Replaced 4 booleans with a single active state
  const [activeSport, setActiveSport] = useState("Cricket");

  const sports = ["Cricket", "Football", "Volleyball", "Basketball"];

  // Properly handle routing side-effects inside useEffect
  useEffect(() => {
    if (!isAuthenticated) {
      router("/sign-up");
    }
  }, [isAuthenticated, router]);

  // Prevent UI flash before redirect happens
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#660909] py-6 max-sm:py-3 px-4 max-sm:px-2 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <h1 className="text-2xl md:text-4xl font-bold text-[#FFB5B5] font-hammersmith tracking-wider uppercase drop-shadow-lg">
            Live <span className="text-white">Scoreboard</span>
          </h1>
          <p className="text-[#FFB5B5]/60 mt-2 text-sm font-bold tracking-[0.2em] uppercase">
            Select a sport to view updates
          </p>
        </motion.div>

        {/* Sliding Pill Navigation */}
        <div className="relative flex flex-wrap justify-center gap-2 md:gap-4 bg-black/30 p-2 md:p-3 rounded-[2rem] border border-white/10 mb-6 shadow-2xl backdrop-blur-md w-full max-w-3xl">
          {sports.map((sport) => (
            <button
              key={sport}
              onClick={() => setActiveSport(sport)}
              className={`relative px-6 py-3 rounded-full text-xs md:text-base font-bold uppercase tracking-widest transition-colors duration-300 z-10 flex-grow md:flex-grow-0
                ${activeSport === sport ? "text-white" : "text-white/50 hover:text-white/80"}
              `}
            >
              {/* The sliding active background */}
              {activeSport === sport && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-[#d03c19] rounded-full -z-10 shadow-[0_0_20px_rgba(208,60,25,0.4)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              {sport}
            </button>
          ))}
        </div>

        {/* Animated Component Rendering */}
        <div 
        className="w-full bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl p-2 shadow-2xl min-h-[400px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSport}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full h-full"
            >
              {activeSport === "Cricket" && <CricketScore />}
              {activeSport === "Football" && <FootballScore />}
              {activeSport === "Volleyball" && <VolleyballScore />}
              {activeSport === "Basketball" && <BasketballScore />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default MatchesScores;