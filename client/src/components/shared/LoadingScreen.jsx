// src/components/LoadingScreen.tsx

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      {/* Minimal logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-wide">
          TribeX<span className="text-[#E11D48]">eSports</span>
        </h1>
      </div>

      {/* Simple spinner */}
      <div className="w-15 h-15 border-4 border-gray-800 border-t-[#E11D48] rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingScreen;
