import React from 'react'

const Button = (props) => {
  return (
    <button className=' max-w-64  text-white text-xl px-3 py-3 bg-[#E11D48] font-Lex font-semibold rounded-lg tracking-wide border-2 border-white shadow-md shadow-[#FC4E5B] 
    transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-none'>
        {props.content}
    </button>
  )
}

export default Button

// bg-linear-to-bl from-violet-500 to-fuchsia-500