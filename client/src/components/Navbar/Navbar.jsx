import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='bg-black fixed top-0 right-0 left-0 z-50'>
      <nav className='max-w-full h-[10vh] px-5 md:px-10 flex justify-between items-center'>
        
        {/* Logo */}
        <Link to="/" className='text-3xl font-bold font-Lex text-white'>
          Nuclian<span className='text-[#E11D48]'>Esports</span>
        </Link>

        {/* Desktop Menu */}
        <ul className='hidden md:flex items-center gap-x-10'>
          <li><Link to="/" className='font-Lex font-bold tracking-wider text-[#E11D48]'>Home</Link></li>
          <li><Link to="/tournaments" className='font-Lex font-bold tracking-wider text-white hover:text-[#E11D48]'>Tournament</Link></li>
          <li><Link to="/matches" className='font-Lex font-bold tracking-wider text-white hover:text-[#E11D48]'>My Matches</Link></li>
          <li><a href="#" className='font-Lex font-bold tracking-wider text-white hover:text-[#E11D48]'>Leaderboard</a></li>
          <li><Link to="/blog" className='font-Lex font-bold tracking-wider text-white hover:text-[#E11D48]'>Blog</Link></li>
        </ul>

        {/* Nav Actions */}
        <div className='hidden md:flex justify-center items-center gap-x-2 pl-5 pr-3'>
          <Link to="/login" className='font-Lex font-bold tracking-wider text-white hover:text-[#E11D48]'>Login</Link>
          <span className='text-white select-none font-bold'>|</span>
          <Link to="/signup" className='font-Lex font-bold tracking-wider text-white hover:text-[#E11D48]'>Sign Up</Link>
        </div>

        {/* Mobile Hamburger */}
        <div className='md:hidden flex items-center'>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiOutlineX className='text-3xl text-white' /> : <HiOutlineMenu className='text-3xl text-white' />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`absolute top-[10vh] right-0 w-full bg-black md:hidden transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <ul className='flex flex-col items-center py-5 gap-5'>
            <li><Link to="/" className='text-white font-bold text-lg' onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/tournaments" className='text-white font-bold text-lg' onClick={() => setIsOpen(false)}>Tournament</Link></li>
            <li><Link to="/matches" className='text-white font-bold text-lg' onClick={() => setIsOpen(false)}>My Matches</Link></li>
            <li><a href="#" className='text-white font-bold text-lg' onClick={() => setIsOpen(false)}>Leaderboard</a></li>
            <li><Link to="/blog" className='text-white font-bold text-lg' onClick={() => setIsOpen(false)}>Blog</Link></li>
            <li className='flex items-center gap-2 mt-3'>
              <Link to="/login" className='text-white font-bold text-lg' onClick={() => setIsOpen(false)}>Login</Link>
              <span className='text-white select-none font-bold'>|</span>
              <Link to="/signup" className='text-white font-bold text-lg' onClick={() => setIsOpen(false)}>Sign Up</Link>
            </li>
          </ul>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
