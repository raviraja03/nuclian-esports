import React from 'react'

const Heading = (props) => {
  return (
    <div className='w-fit'>
        <h2 className='text-4xl font-bold'>
            <span className='text-[#E11D48]'>{props.highlight}</span> {props.nohighlight}
        </h2>
        <div className='w-34 mt-2 h-1 bg-[#E11D48] ml-auto'></div>
    </div>
  )
}

export default Heading