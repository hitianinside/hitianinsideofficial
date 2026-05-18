import React, { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";
const API_URL = process.env.REACT_APP_BACKEND_URL;

const ScoresForHome = () => {
  // STATES
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchScores = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}/api/user/cricket-scores`
      );
      if (res.data.success) {
        setScores(res.data.data.slice(0, 2));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-red-500/20 border-t-red-500 animate-spin" />
            <p className="text-gray-400">
              Loading Scores...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if(scores.length === 0){
    return null;
  }

  return (
    <section className="relative py-10 px-4 md:px-10 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-red-200 uppercase tracking-[0.2em] text-sm font-semibold">
              Cricket Updates
            </p>
            <h2 className="text-lg font-black text-white">
              Latest Match Scores
            </h2>
          </div>

          {/* SEE ALL */}
          <Link to="/scorecards">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-600 hover:bg-red-500 transition-all duration-300 font-semibold text-white group">
              View All
              <FiArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
            </button>
          </Link>
        </div>

        {/* SCORES */}
        <div className="grid grid-cols-2 gap-5">
          {scores.map((score, index) => {
            const isLive =
              score.match_status?.toLowerCase() === "live";
            return (
              <motion.div
                key={score._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <Link to={`/scorecards`}>
                  <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-red-800/70 hover:border-red-500/20 transition-all duration-500 p-5 h-[180px]">
                    {/* GLOW */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-b from-red-500/[0.05] to-transparent" />
                    {/* TOP */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-red-200 uppercase tracking-[0.2em] text-[11px] font-bold">
                        {score.match_type}
                      </span>
                      {isLive && (
                        <div className="flex items-center gap-2 text-red-400">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                          <span className="text-[11px] font-bold uppercase">
                            Live
                          </span>
                        </div>
                      )}

                    </div>
                    {/* TEAMS */}
                    <div className="space-y-4">
                      {/* TEAM 1 */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={score.team1_details.team_logo}
                            alt={score.team1_details.team_name}
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                          />
                          <h3 className="text-white font-bold text-sm line-clamp-1">
                            {score.team1_details.team_name}
                          </h3>
                        </div>
                        <h2 className="text-lg font-black text-white">
                          {score.team1_details.team_run}/
                          {score.team1_details.team_wicket_loss}
                        </h2>
                      </div>

                      {/* TEAM 2 */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={score.team2_details.team_logo}
                            alt={score.team2_details.team_name}
                            className="w-10 h-10 rounded-full object-cover border border-white/10"
                          />
                          <h3 className="text-white font-bold text-sm line-clamp-1">
                            {score.team2_details.team_name}
                          </h3>
                        </div>
                        <h2 className="text-lg font-black text-white">
                          {score.team2_details.team_run}/
                          {score.team2_details.team_wicket_loss}
                        </h2>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
        {/* MOBILE BUTTON */}
        <div className="flex justify-center mt-10 md:hidden">
          <Link to="/scores">
            <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 transition-all duration-300 font-semibold text-white">
              View All Scores
              <FiArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ScoresForHome;