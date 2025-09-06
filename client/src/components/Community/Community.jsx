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
    <section className="font-Lex mt-5 mb-5">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-10 text-white">
        <div className="flex items-center justify-center rounded-lg mx-4 sm:mx-[30px] lg:mx-[50px] min-h-[30vh] bg-gradient-to-b from-[#C0103F] via-[#260E27] to-[#000]">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full px-4 sm:px-6 lg:px-[50px] py-6 gap-10">
            
            {/* Left Side: Text and Button */}
            <div className="flex flex-col items-start text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug">
                JOIN THE NUCLIANESPORTS
                <br />
                <span className="text-[#17A448]">COMMUNITY</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg mt-2">
                Connect with fellow gamers and stay updated on all
                <br className="hidden sm:block" />
                things Nuclianesports. Join us now!
              </p>
              <a
                href="#"
                className="mt-6 inline-block py-2.5 px-6 bg-[#17A448] text-black border-2 border-white rounded font-bold text-sm sm:text-base shadow-[0px_4px_25px_0px_rgba(23,164,72,0.72)] transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
              >
                Join Community
              </a>
            </div>

            {/* Right Side: Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-6">
              {featureData.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start bg-white p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 ease-linear w-full sm:min-w-[180px]"
                >
                  <div className="mb-3 text-3xl text-[#ffd43b]">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-black">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-black">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
