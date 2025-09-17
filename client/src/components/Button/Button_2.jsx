import React from 'react'

const Button_2 = ({ content, func, disabled  }) => {
  return (
    <button
      disabled={disabled}
      onClick={func}
      className={`
        w-full sm:w-auto
        bg-[#E11D48] text-white 
        text-sm sm:text-base md:text-lg
        px-3 sm:px-5 py-2 sm:py-3
        font-Lex font-semibold rounded-lg tracking-wide
        border-2 border-white
        shadow-md shadow-[#FC4E5B]
        transition-all duration-200 ease-out
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:scale-105 hover:shadow-none cursor-pointer'
        }
      `}
    >
      {content}
    </button>
  )
}

export default Button_2
