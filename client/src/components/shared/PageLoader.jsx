// src/components/PageLoader.tsx
import React from "react";

const PageLoader= () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-black/80 w-full min-h-[60vh]">
      {/* Neon spinning circles */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-blue-500 border-b-transparent rounded-full animate-spin-slow"></div>
      </div>

      {/* Loading text */}
      <p className="mt-6 text-lg font-bold text-pink-400 tracking-widest animate-pulse">
        LOADING...
      </p>
    </div>
  );
};

export default PageLoader;
