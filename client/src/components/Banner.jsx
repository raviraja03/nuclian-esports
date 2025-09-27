import React from 'react'
import bcard from '../assets/banner_card_4.jpg'
// import bcard from '../assets/Gemini_Generated_Image_l87jrfl87jrfl87j.png'

const Banner = () => {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-10">
      <img
        src={bcard}
        alt="banner"
        className="w-full h-40 sm:h-60 md:h-80 lg:h-[28rem] object-cover rounded-lg shadow-lg"
      />
    </div>
  )
}

export default Banner
