import React from "react";
import { FaBolt, FaKey, FaHeadset } from "react-icons/fa";

const featureData = [
  {
    icon: <FaBolt />,
    title: "Instant Updates",
    description: "Get notified about new tournaments and matches",
  },
  {
    icon: <FaKey />,
    title: "Room Codes",
    description: "Receive room codes and match details instantly",
  },
  {
    icon: <FaHeadset />,
    title: "Live Support",
    description: "24/7 community support and assistance",
  },
];

const CommunitySection = () => {
  return (
    <section className="font-Lex py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-white">
        <div className="relative rounded-2xl mx-0 overflow-hidden bg-gradient-to-b from-[#C0103F] via-[#260E27] to-[#000] shadow-2xl border border-white/10 min-h-[30vh]">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full px-4 sm:px-6 lg:px-12 py-8 lg:py-12 gap-8 lg:gap-12">
            {/* Left Side: Text and Button */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight mb-4">
                JOIN THE TribeXeSports
                <br className="hidden sm:block" />
                <span className="text-[#17A448]">COMMUNITY</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-200 max-w-md mb-6">
                Connect with fellow gamers and stay updated on all things
                TribeXeSports. Join us now!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  arget="_blank"
                  rel="noopener noreferrer"
                  href="https://whatsapp.com/channel/0029Vb6nTSk4o7qDjcH17I1K"
                  className="inline-block py-3 px-6 bg-[#17A448] text-black font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-[#17A448]/50 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-[#17A448]/70 focus:outline-none focus:ring-2 focus:ring-[#17A448]/50"
                >
                  Join Whatsapp
                </a>
                <a
                  rel="noopener noreferrer"
                  href="https://discord.gg/pbFZQMWYQu"
                  target="_blank"
                  className="inline-block py-3 px-6 bg-[#1769a4] text-black font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-[#1769a4]/50 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1769a4]/70 focus:outline-none focus:ring-2 focus:ring-[#1769a4]/50"
                >
                  Join Discord
                </a>
              </div>
            </div>

            {/* Right Side: Feature Cards */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              {featureData.map((feature, index) => (
                <div
                  key={index}
                  className="relative bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out border border-white/20 flex flex-col items-center text-center min-h-[120px] group"
                >
                  <div className="mb-4 text-3xl text-[#ffd43b] group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-base sm:text-lg font-bold text-white tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Subtle background overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
