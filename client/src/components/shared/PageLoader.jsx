// src/components/PageLoader.jsx
import React from "react";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-8 h-8 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default PageLoader;
