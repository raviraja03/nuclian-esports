import React from "react";
import Heading from "../Heading/Heading";
import { TbCircleDashedNumber1 } from "react-icons/tb";
import { TbCircleDashedNumber2 } from "react-icons/tb";
import { TbCircleDashedNumber3 } from "react-icons/tb";

const Step = () => {
  return (
    <section className="font-Lex">
      <div className="max-w-full mx-auto px-15 py-10 text-white">
        <Heading highlight="Steps" nohighlight="to join" />
        {/* Content */}
        <div className="flex gap-16 mt-12 px-8">
          <h3 className="text-2xl font-bold">
            Join the Exciting World of eSports Tournaments with Nuclian
            <span className="text-[#E11D48]">esports</span>
          </h3>
          <p className="font-semibold w-2xl">
            Participating in eSports tournaments has never been easier. Follow
            our simple steps to register, compete, and win. Get ready to
            showcase your skills and join the action!
          </p>
        </div>

        {/* Steps Cards */}
        <div className="mt-12 flex gap-10 px-8 ">
          {/* Card-1 */}
          <div className="flex bg-[#0a141d]/76 flex-1 p-4 rounded-lg hover:scale-105 transition-all duration-200 ease-linear">
            <div>
              <span className="flex justify-center items-center bg-yellow-500 w-12 h-12 rounded-lg text-black text-3xl mr-4">
                <TbCircleDashedNumber1 />
              </span>
            </div>
            <div>
              <h3 className="text-2xl text-white font-semibold">
                Step 1: Create Your Account.
              </h3>
              <p className="text-lg mt-4 mb-6">
                Sign up quickly and easily to start your journey.
              </p>
              <a href="#" className="text-[#E11D48] font-bold">
                Sign Up 
              </a>
            </div>
          </div>

          {/* Card-2 */}
          <div className="flex bg-[#0a141d]/76 flex-1 p-4 rounded-lg hover:scale-105 transition-all duration-200 ease-linear">
            <div>
              <span className="flex justify-center items-center bg-yellow-500 w-12 h-12 rounded-lg text-black text-3xl mr-4">
                <TbCircleDashedNumber2 />
              </span>
            </div>
            <div>
              <h3 className="text-2xl text-white font-semibold">
                Step 2: Browse and Select Tournaments.
              </h3>
              <p className="text-lg mt-4 mb-6">
                Use our filters to find tournaments that suit your game and preferences. 
              </p>
              <a href="#" className="text-[#E11D48] font-bold">
                Explore
              </a>
            </div>
          </div>

          {/* Card-3 */}
          <div className="flex bg-[#0a141d]/76 flex-1 p-4 rounded-lg hover:scale-105 transition-all duration-200 ease-linear">
            <div>
              <span className="flex justify-center items-center bg-yellow-500 w-12 h-12 rounded-lg text-black text-3xl mr-4">
                <TbCircleDashedNumber3 />
              </span>
            </div>
            <div>
              <h3 className="text-2xl text-white font-semibold">
                Step 3: Join and Compete
              </h3>
              <p className="text-lg mt-4 mb-6">
                Click 'Join Now' to enter the tournament and start competing!
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Step;
