import React from 'react'

const Button_2 = (props) => {
  return (
    <button className=' w-full bg-[#E11D48] text-white text-md px-2 py-2 font-Lex font-semibold rounded-lg tracking-wide border-2 border-white shadow-md shadow-[#FC4E5B] 
    hover:scale-105 hover:shadow-none transition-all duration-200 ease-out cursor-pointer'>
        {props.content}
    </button>
  )
}

export default Button_2