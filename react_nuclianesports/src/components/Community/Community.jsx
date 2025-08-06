import React from "react";
import { FaBolt, FaKey, FaHeadset } from "react-icons/fa";
import { PiSelectionBold } from "react-icons/pi";

// Data for the feature cards to keep the JSX clean
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
      <div className="max-w-full mx-auto px-15 py-10 text-white">
        <div className="flex items-center justify-center rounded-lg mx-[50px] min-h-[30vh] bg-gradient-to-b from-[#C0103F] via-[#260E27] to-[#000]">
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center w-full px-[50px] min-h-[40vh]">
              {/* Left Side: Text and Button */}
              <div className="flex flex-col items-start justify-center">
                <h2 className="text-3xl font-extrabold text-white">
                  JOIN THE NUCLIANESPORTS
                  <br />
                  <span className="text-[#17A448]">COMMUNITY</span>
                </h2>
                <p className="text-white mt-2">
                  Connect with fellow gamers and stay updated on all
                  <br />
                  things Nuclianesports. Join us now!
                </p>
                <a
                  href="#"
                  className="mt-[30px] inline-block py-2.5 px-6 bg-[#17A448] text-black border-2 border-white rounded font-bold no-underline text-base shadow-[0px_4px_25px_0px_rgba(23,164,72,0.72)] transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                >
                  Join Community
                </a>
              </div>

              {/* Right Side: Feature Cards */}
              <div className="flex ml-[100px] gap-[50px]">
                {featureData.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start min-w-[180px] bg-white p-2.5 rounded-lg shadow-[0px_4px_25px_0px_#ffffff] flex-1 hover:scale-105 transition-all duration-300 ease-linear"
                  >
                    <div className="mb-5 text-3xl text-[#ffd43b] ">
                      {feature.icon}
                    </div>
                    <h3 className="mb-1.5 text-lg font-bold text-black">
                      {feature.title}
                    </h3>
                    <p className="text-base text-black">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
