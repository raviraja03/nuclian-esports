import React from 'react'
import Heading from '../Heading/Heading'
import Button_2 from '../Button/Button_2'
import { TbTargetArrow } from "react-icons/tb";
import { IoRocketSharp } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { FaStarHalfStroke } from 'react-icons/fa6';

const Achievement = () => {
  return (
    <section>
        <div className='max-w-full mx-auto px-15 py-10 text-white font-Lex'>
            <Heading highlight="Numbers" nohighlight="That Matter"/>

            <div className='flex mt-12 gap-32 px-8'>
                {/* Left Content */}
                <div>
                    <h3 className='text-2xl font-bold '>
                        Our Impressive Achievements In Esports
                    </h3>
                    <p className='font-semibold mt-5 mb-27 max-w-2xl'>
                        At Nuclianesports, we pride ourselves on our competitive edge. Our community thrives on passion, skill, and teamwork.
                        Every win, every milestone, and every new member is a testament to the relentless spirit that drives us forward. 
                    </p>
                    <a href="#">
                        <button className=' max-w-64 bg-[#E11D48] text-white text-md px-2 py-2 font-Lex font-semibold rounded-lg tracking-wide border-2 border-white shadow-md shadow-[#FC4E5B] hover:scale-105 hover:shadow-none transition-all duration-200 ease-out cursor-pointer'>
                            Join Now
                        </button>
                    </a>
                </div>

                {/* Right Grid */}
                <div>
                    <div className="grid grid-cols-2 grid-rows-2 gap-8">
                        {/* grid-1 */}
                        <div className=' bg-[linear-gradient(122deg,rgba(0,0,0,0.8)_19.87%,#1C1B29_55.18%)] shadow-[0px_4px_20px_10px_#0C0722] p-4 rounded-lg hover:scale-105 transition-all duration-300 ease-linear'>
                            {/* Icon */}
                            <div className='flex justify-center items-center bg-yellow-500 w-12 h-12 rounded-lg text-black text-3xl'>
                                <TbTargetArrow />
                            </div>
                            {/* Content */}
                            <div>
                                <h4 className='font-semibold mt-5'>
                                    85% User Retention Rate
                                </h4>
                            </div>
                        </div>

                        {/* grid-2 */}
                        <div className=' bg-[linear-gradient(122deg,rgba(0,0,0,0.8)_19.87%,#1C1B29_55.18%)] shadow-[0px_4px_20px_10px_#0C0722] p-4 rounded-lg hover:scale-105 transition-all duration-200 ease-linear'>
                            {/* Icon */}
                            <div className='flex justify-center items-center bg-yellow-500 w-12 h-12 rounded-lg text-black text-3xl'>
                                <IoRocketSharp />
                            </div>
                            {/* Content */}
                            <div>
                                <h4 className='font-semibold mt-5'>
                                    500+ Tournaments Hosted
                                </h4>
                            </div>
                        </div>

                        {/* grid-3 */}
                        <div className=' bg-[linear-gradient(122deg,rgba(0,0,0,0.8)_19.87%,#1C1B29_55.18%)] shadow-[0px_4px_20px_10px_#0C0722] p-4 rounded-lg hover:scale-105 transition-all duration-200 ease-linear'>
                            {/* Icon */}
                            <div className='flex justify-center items-center bg-yellow-500 w-12 h-12 rounded-lg text-black text-3xl'>
                                <FaUser />
                            </div>
                            {/* Content */}
                            <div>
                                <h4 className='font-semibold mt-5'>
                                    100K+ Community Members
                                </h4>
                            </div>
                        </div>

                        {/* grid-4 */}
                        <div className=' bg-[linear-gradient(122deg,rgba(0,0,0,0.8)_19.87%,#1C1B29_55.18%)] shadow-[0px_4px_20px_10px_#0C0722] p-4 rounded-lg hover:scale-105 transition-all duration-200 ease-linear'>
                            {/* Icon */}
                            <div className='flex justify-center items-center bg-yellow-500 w-12 h-12 rounded-lg text-black text-3xl'>
                                <FaStarHalfStroke />
                            </div>
                            {/* Content */}
                            <div>
                                <h4 className='font-semibold mt-5'>
                                    4.5+ User Satisfaction Score
                                </h4>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Achievement