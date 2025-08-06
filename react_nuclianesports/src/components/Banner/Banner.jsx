import React from 'react'
import bcard from '../../assets/banner_card_4.jpg'

const Banner = () => {
  return (
    <div className='max-w-full mx-auto px-15 py-10'>
        <img src={bcard} alt="banner" className="w-full object-cover"/>
    </div>
  )
}

export default Banner