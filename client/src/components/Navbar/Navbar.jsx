import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="bg-black/95 fixed top-0 right-0 left-0 z-50 shadow-md shadow-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-[10vh] flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl sm:text-3xl font-bold font-Lex text-white tracking-tight">
          Nuclian<span className="text-[#E11D48]">Esports</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden xl:flex items-center gap-x-6 lg:gap-x-8">
          <li>
            <Link to="/" className={`font-Lex font-semibold text-base lg:text-lg ${pathname === "/" ? "text-[#E11D48]" : "text-white"} transition-colors duration-300 hover:text-[#FC4E5B]`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/tournaments" className={`font-Lex font-semibold text-base lg:text-lg ${pathname.startsWith("/tournaments") ? "text-[#E11D48]" : "text-white"} transition-colors duration-300 hover:text-[#FC4E5B]`}>
              Tournament
            </Link>
          </li>
          <li>
            <Link to="/matches" className={`font-Lex font-semibold text-base lg:text-lg ${pathname.startsWith("/matches") ? "text-[#E11D48]" : "text-white"} transition-colors duration-300 hover:text-[#FC4E5B]`}>
              My Matches
            </Link>
          </li>
          <li>
            <a href="#" className={`font-Lex font-semibold text-base lg:text-lg ${pathname.startsWith("/leaderboard") ? "text-[#E11D48]" : "text-white"} transition-colors duration-300 hover:text-[#FC4E5B]`}>
              Leaderboard
            </a>
          </li>
          <li>
            <Link to="/blog" className={`font-Lex font-semibold text-base lg:text-lg ${pathname.startsWith("/blog") ? "text-[#E11D48]" : "text-white"} transition-colors duration-300 hover:text-[#FC4E5B]`}>
              Blog
            </Link>
          </li>
        </ul>

        {/* Desktop Nav Actions */}
        <div className="hidden xl:flex items-center gap-x-3 pl-4 pr-2">
          <Link to="/login" className="font-Lex font-semibold text-base lg:text-lg text-white transition-colors duration-300 hover:text-[#FC4E5B] focus:outline-none">
            Login
          </Link>
          <span className="text-white/50 select-none font-bold">|</span>
          <Link to="/signup" className="font-Lex font-semibold text-base lg:text-lg text-white transition-colors duration-300 hover:text-[#FC4E5B] focus:outline-none">
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="xl:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl text-white focus:outline-none focus:ring-2 focus:ring-[#E11D48]/50 rounded"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-4/5 sm:w-2/3 max-w-xs bg-black/95 backdrop-blur-sm shadow-2xl shadow-white/10 xl:hidden transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-6 px-6">
            <button
              onClick={() => setIsOpen(false)}
              className="self-end text-3xl text-white focus:outline-none focus:ring-2 focus:ring-[#E11D48]/50 rounded"
              aria-label="Close menu"
            >
              <HiOutlineX />
            </button>
            <ul className="flex flex-col items-center justify-center flex-grow gap-6 py-8">
              <li>
                <Link
                  to="/"
                  className="text-white font-Lex font-semibold text-lg transition-colors duration-300 hover:text-[#FC4E5B]"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tournaments"
                  className="text-white font-Lex font-semibold text-lg transition-colors duration-300 hover:text-[#FC4E5B]"
                  onClick={() => setIsOpen(false)}
                >
                  Tournament
                </Link>
              </li>
              <li>
                <Link
                  to="/matches"
                  className="text-white font-Lex font-semibold text-lg transition-colors duration-300 hover:text-[#FC4E5B]"
                  onClick={() => setIsOpen(false)}
                >
                  My Matches
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white font-Lex font-semibold text-lg transition-colors duration-300 hover:text-[#FC4E5B]"
                  onClick={() => setIsOpen(false)}
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-white font-Lex font-semibold text-lg transition-colors duration-300 hover:text-[#FC4E5B]"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li className="flex items-center gap-4 mt-4">
                <Link
                  to="/login"
                  className="text-white font-Lex font-semibold text-lg transition-colors duration-300 hover:text-[#FC4E5B]"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <span className="text-white/50 select-none font-bold">|</span>
                <Link
                  to="/signup"
                  className="text-white font-Lex font-semibold text-lg transition-colors duration-300 hover:text-[#FC4E5B]"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;