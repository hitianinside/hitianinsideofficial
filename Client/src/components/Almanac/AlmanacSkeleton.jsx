import React from "react";

export default function AlmanacSkeleton() {
  return (
    <div className="min-h-screen bg-[#6A0000] flex flex-col items-center py-8 px-4 text-center">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-pulse">
        Almanac
      </h1>

      {/* Paragraph skeleton */}
      <div className="w-full flex flex-col items-center gap-3 mb-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="w-[90%] h-8 rounded-xl bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer"
          ></div>
        ))}
      </div>

      {/* Button skeleton */}
      <div className="w-40 h-16 rounded-full bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer mb-8"></div>

      {/* Footer heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 animate-pulse">
        Best of Almanac
      </h2>

      {/* Illustration skeleton */}
      <div className="flex flex-wrap justify-center gap-5 my-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-48 h-48 bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] rounded-lg shimmer"
          ></div>
        ))}
      </div>

      {/* Shimmer animation CSS */}
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
    </div>
  );
}