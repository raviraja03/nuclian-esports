// src/components/LoadingScreen.tsx
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-black text-white">
      {/* Neon logo / brand text */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
        <span className="text-pink-600">Nuclian</span>
        <span className="text-white">Esports</span>
      </h1>

      {/* Neon spinner */}
      <div className="relative">
        <div className="w-20 h-20 border-4 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-blue-500 border-b-transparent rounded-full animate-spin-slow"></div>
      </div>

      {/* Loading text */}
      <p className="mt-6 text-lg tracking-widest text-pink-400 animate-pulse">
        LOADING...
      </p>
    </div>
  );
};

export default LoadingScreen;
