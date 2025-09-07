import React from 'react'

const Button = ({ content }) => {
  return (
    <button
      className="
        w-full sm:w-auto
        text-sm sm:text-base md:text-lg
        px-4 sm:px-6 py-2 sm:py-3
        bg-[#E11D48] text-white font-Lex font-semibold
        rounded-lg tracking-wide border-2 border-white
        shadow-md shadow-[#FC4E5B]
        transition-all duration-300 cursor-pointer
        hover:-translate-y-1 hover:shadow-none
      "
    >
      {content}
    </button>
  )
}

export default Button
