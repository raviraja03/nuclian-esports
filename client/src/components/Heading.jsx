import React from 'react'

const Heading = (props) => {
  return (
    <div className='w-fit mx-auto text-center'>
        <h2 className='text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4'>
            <span className='text-[#E11D48]'>{props.highlight}</span> {props.nohighlight}
        </h2>
        <div className='w-24 h-1 bg-[#E11D48] mx-auto rounded-full'></div>
    </div>
  )
}

export default Heading