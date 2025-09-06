import React from "react";
import Heading from "../Heading/Heading";
import { TbCircleDashedNumber1, TbCircleDashedNumber2, TbCircleDashedNumber3 } from "react-icons/tb";

const Step = () => {
  return (
    <section className="font-Lex">
      <div className="max-w-7xl mx-auto px-6 py-10 text-white">
        {/* Heading */}
        <Heading highlight="Steps" nohighlight="to join" />

        {/* Content */}
        <div className="flex flex-col md:flex-row md:items-center gap-8 mt-12">
          <h3 className="text-2xl font-bold md:w-1/2">
            Join the Exciting World of eSports Tournaments with{" "}
            <span className="text-[#E11D48]">NuclianEsports</span>
          </h3>
          <p className="font-semibold md:w-1/2 text-gray-300">
            Participating in eSports tournaments has never been easier. Follow
            our simple steps to register, compete, and win. Get ready to
            showcase your skills and join the action!
          </p>
        </div>

        {/* Steps Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card-1 */}
          <div className="flex bg-[#0a141d]/80 flex-col sm:flex-row p-6 rounded-xl hover:scale-105 transition-all duration-200 ease-linear">
            <span className="flex justify-center items-center bg-yellow-500 w-12 h-12 rounded-lg text-black text-3xl mr-0 sm:mr-4 mb-4 sm:mb-0">
              <TbCircleDashedNumber1 />
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">
                Step 1: Create Your Account
              </h3>
              <p className="text-base md:text-lg mt-3 mb-4 text-gray-300">
                Sign up quickly and easily to start your journey.
              </p>
              <a href="#" className="text-[#E11D48] font-bold hover:underline">
                Sign Up
              </a>
            </div>
          </div>

          {/* Card-2 */}
          <div className="flex bg-[#0a141d]/80 flex-col sm:flex-row p-6 rounded-xl hover:scale-105 transition-all duration-200 ease-linear">
            <span className="flex justify-center items-center bg-yellow-500 w-12 h-12 rounded-lg text-black text-3xl mr-0 sm:mr-4 mb-4 sm:mb-0">
              <TbCircleDashedNumber2 />
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">
                Step 2: Browse and Select Tournaments
              </h3>
              <p className="text-base md:text-lg mt-3 mb-4 text-gray-300">
                Use our filters to find tournaments that suit your game and
                preferences.
              </p>
              <a href="#" className="text-[#E11D48] font-bold hover:underline">
                Explore
              </a>
            </div>
          </div>

          {/* Card-3 */}
          <div className="flex bg-[#0a141d]/80 flex-col sm:flex-row p-6 rounded-xl hover:scale-105 transition-all duration-200 ease-linear">
            <span className="flex justify-center items-center bg-yellow-500 w-12 h-12 rounded-lg text-black text-3xl mr-0 sm:mr-4 mb-4 sm:mb-0">
              <TbCircleDashedNumber3 />
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">
                Step 3: Join and Compete
              </h3>
              <p className="text-base md:text-lg mt-3 mb-4 text-gray-300">
                Click 'Join Now' to enter the tournament and start competing!
              </p>
              <a href="#" className="text-[#E11D48] font-bold hover:underline">
                Join Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step;
