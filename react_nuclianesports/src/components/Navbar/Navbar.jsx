import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='bg-black fixed top-0 right-0 left-0 z-50'>
        <nav className='min-w-full h-[10vh] p-5 flex justify-between items-cente'>
            {/* Logo */}
            <Link to="/" className='text-3xl font-bold font-Lex text-white'>
                Nuclian<span className='text-[#E11D48]'>Esports</span>
            </Link>

            {/* Desktop Menu */}
            <ul className='flex items-center gap-x-10'>
                <li>
                    <Link href="/" className='font-Lex font-bold tracking-wider text-[#E11D48]'>Home</Link>
                </li>
                <li>
                    <Link to="/tournaments" className='font-Lex font-bold tracking-wider text-white hover:text-[#E11D48]'>Tournament</Link>
                </li>
                <li>
                    <Link to="/matches" className='font-Lex font-bold tracking-wider text-white hover:text-[#E11D48]'>My Matches</Link>
                </li>
                <li>
                    <a href="#" className='font-Lex font-bold tracking-wider text-white hover:text-[#E11D48]'>Leaderboard</a>
                </li>
                <li>
                    <Link to="/blog" className='font-Lex font-bold tracking-wider text-white hover:text-[#E11D48]'>Blog</Link>
                </li>
            </ul>

            {/* Nav Action */}
            <div className='flex justify-center items-center gap-x-2 pl-5 pr-3'>
                <Link to="/login" className='font-Lex font-bold tracking-wider text-white hover:text-[#E11D48]'>Login</Link>
                <span className='text-white select-none font-bold'>|</span>
                <Link to="/signup" className='font-Lex font-bold tracking-wider text-white hover:text-[#E11D48]'>Sign Up</Link>
            </div>
        </nav>
    </header>
  )
}

export default Navbar