import React from "react";

export default function HomeSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#6A0000] text-center overflow-hidden">
      {/* Top heading */}
      <h2 className="text-3xl text-white font-semibold mt-8 mb-2 animate-pulse">
        COME AND EXPLORE
      </h2>

      {/* Subheading/logo */}
      <div className="w-44 h-6 rounded bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer mb-8"></div>

      {/* Bridge illustration skeleton */}
      <div className="w-full h-32 bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer"></div>

      {/* Pink content area */}
      <div className="w-full bg-[#f8c8c8] mt-[-1px] flex flex-col items-center py-10 px-6 rounded-t-3xl">
        {/* About us heading */}
        <div className="w-32 h-5 rounded bg-gradient-to-r from-[#d28b8b] via-[#e9b2b2] to-[#d28b8b] shimmer mb-6"></div>

        {/* Paragraph skeleton */}
        <div className="w-full max-w-md flex flex-col items-center gap-3 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-[90%] h-3 rounded bg-gradient-to-r from-[#d28b8b] via-[#e9b2b2] to-[#d28b8b] shimmer"
            ></div>
          ))}
        </div>

        {/* Button skeleton */}
        <div className="w-32 h-9 rounded-full bg-gradient-to-r from-[#d28b8b] via-[#e9b2b2] to-[#d28b8b] shimmer mb-10"></div>

        {/* Gallery Image Skeletons */}
        <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-[95%] aspect-square rounded-lg bg-gradient-to-r from-[#d28b8b] via-[#e9b2b2] to-[#d28b8b] shimmer"
            ></div>
          ))}
        </div>
      </div>

      {/* NEW GALLERY SECTION SKELETON */}
      <div className="w-full flex flex-col md:flex-row bg-[#6A0000] py-12 px-8 md:px-16 items-center gap-10">
        {/* Left text section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2">
          <div className="w-40 h-8 rounded bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer mb-6"></div>

          <div className="flex flex-col gap-3 mb-6 w-[90%]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-5 rounded bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer"
              ></div>
            ))}
          </div>

          <div className="w-32 h-9 rounded-full bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer"></div>
        </div>

        {/* Right gallery preview skeleton */}
        <div
          className="w-full aspect-square rounded-lg bg-gradient-to-r from-[#7a2b2b] via-[#9e4c4c] to-[#7a2b2b] shimmer"
        ></div>
      </div>

      {/* Shimmer animation */}
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
