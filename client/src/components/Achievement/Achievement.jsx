import React from 'react'
import Heading from '../Heading/Heading'
import { TbTargetArrow } from "react-icons/tb";
import { IoRocketSharp } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { FaStarHalfStroke } from 'react-icons/fa6';

const Achievement = () => {
  return (
    <section className="bg-black py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-white font-Lex">
        <Heading highlight="Numbers" nohighlight="That Matter" />

        {/* Flex container with responsive stack */}
        <div className="flex flex-col lg:flex-row mt-10 sm:mt-12 gap-8 sm:gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
              Our Impressive Achievements In Esports
            </h3>
            <p className="font-semibold mt-4 sm:mt-5 mb-6 sm:mb-8 max-w-2xl text-sm sm:text-base lg:text-lg text-gray-300">
              At Nuclianesports, we pride ourselves on our competitive edge. Our community thrives on passion, skill, and teamwork.
              Every win, every milestone, and every new member is a testament to the relentless spirit that drives us forward.
            </p>
            <a href="#">
              <button className="w-full sm:w-auto bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white text-sm sm:text-base px-6 py-3 font-semibold rounded-lg tracking-wide border-2 border-white/20 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50">
                Join Now
              </button>
            </a>
          </div>

          {/* Right Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* grid-1 */}
              <div className="bg-[linear-gradient(122deg,rgba(0,0,0,0.9)_19.87%,#1C1B29_55.18%)] p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out backdrop-blur-sm border border-white/10">
                <div className="flex justify-center items-center bg-yellow-400 w-12 h-12 rounded-lg text-black text-2xl sm:text-3xl">
                  <TbTargetArrow />
                </div>
                <h4 className="font-semibold mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg">
                  85% User Retention Rate
                </h4>
              </div>

              {/* grid-2 */}
              <div className="bg-[linear-gradient(122deg,rgba(0,0,0,0.9)_19.87%,#1C1B29_55.18%)] p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out backdrop-blur-sm border border-white/10">
                <div className="flex justify-center items-center bg-yellow-400 w-12 h-12 rounded-lg text-black text-2xl sm:text-3xl">
                  <IoRocketSharp />
                </div>
                <h4 className="font-semibold mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg">
                  500+ Tournaments Hosted
                </h4>
              </div>

              {/* grid-3 */}
              <div className="bg-[linear-gradient(122deg,rgba(0,0,0,0.9)_19.87%,#1C1B29_55.18%)] p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out backdrop-blur-sm border border-white/10">
                <div className="flex justify-center items-center bg-yellow-400 w-12 h-12 rounded-lg text-black text-2xl sm:text-3xl">
                  <FaUser />
                </div>
                <h4 className="font-semibold mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg">
                  100K+ Community Members
                </h4>
              </div>

              {/* grid-4 */}
              <div className="bg-[linear-gradient(122deg,rgba(0,0,0,0.9)_19.87%,#1C1B29_55.18%)] p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out backdrop-blur-sm border border-white/10">
                <div className="flex justify-center items-center bg-yellow-400 w-12 h-12 rounded-lg text-black text-2xl sm:text-3xl">
                  <FaStarHalfStroke />
                </div>
                <h4 className="font-semibold mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg">
                  4.5+ User Satisfaction Score
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Achievement