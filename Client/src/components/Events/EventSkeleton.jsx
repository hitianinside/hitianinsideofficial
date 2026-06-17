import React from "react";

export default function EventsSkeleton() {
  return (
    <div className="min-h-screen bg-[#6A0000] flex flex-col items-center py-8">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-pulse">
        EVENTS
      </h1>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-[90%] max-w-5xl">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-full aspect-[4/3] bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] rounded-lg animate-[shimmer_1.5s_infinite_linear]"
          ></div>
        ))}
      </div>

      {/* Footer heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 animate-pulse">
        Our Events
      </h2>

      {/* Instagram Reel–like skeleton */}
      <div className="w-[90%] max-w-sm mt-6 bg-[#5a0000] rounded-xl overflow-hidden shadow-lg">
        {/* Reel video skeleton */}
        <div className="w-full aspect-[9/16] bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] animate-[shimmer_1.5s_infinite_linear]"></div>

        {/* Reel footer (profile + icons) */}
        <div className="flex items-center justify-between p-4">
          {/* Left: profile pic + name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] animate-[shimmer_1.5s_infinite_linear]"></div>
            <div className="flex flex-col gap-2">
              <div className="w-24 h-3 rounded bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] animate-[shimmer_1.5s_infinite_linear]"></div>
              <div className="w-16 h-3 rounded bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] animate-[shimmer_1.5s_infinite_linear]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer keyframes */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .animate-[shimmer_1.5s_infinite_linear] {
            background-size: 200% 100%;
          }
        `}
      </style>
    </div>
  );
}