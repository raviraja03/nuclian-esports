import React from 'react';
import { FaInstagram, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const SiteFooter = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white pb-[10px] border-t border-[#1a1a1a] font-Lex mt-7">
      <div className="min-w-full p-5">
        <div className="grid grid-cols-[3fr_1fr_1fr] gap-[100px] mb-5">
          {/* Brand Info */}
          <div className="pr-[30px] ">
            <div className="text-[2rem] font-bold mb-[5px] ">
              Nuclian<span className='text-[#E11D48]'>Esports</span>
            </div>
            <div className="text-[0.9rem] opacity-70 mb-5">EST. 2025</div>
            <p className="text-[0.95rem] leading-[1.6] opacity-80 pb-5">
              The ultimate esports tournament platform. Join competitions, win prizes, and dominate the leaderboards in India's premier gaming arena.
            </p>
            <div className="flex gap-[15px]">
              <a href="#" title="Facebook" className="flex items-center justify-center w-10 h-10 text-white bg-white/10 rounded-full text-[1.2rem] relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0 active:scale-95 hover:bg-[#5865F2] hover:shadow-[0_5px_15px_rgba(24,119,242,0.4)]">
                <FaDiscord />
              </a>
              <a href="#" title="Twitter" className="flex items-center justify-center w-10 h-10 text-white bg-white/10 rounded-full text-[1.2rem] relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0 active:scale-95 hover:bg-[#000000] hover:shadow-[0_5px_15px_rgba(0,0,0,0.4)]">
                <FaXTwitter />
              </a>
              <a href="#" title="Instagram" className="group flex items-center justify-center w-10 h-10 text-white bg-white/10 rounded-full text-[1.2rem] relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0 active:scale-95 hover:shadow-[0_5px_15px_rgba(131,58,180,0.4)]">
                <div className="absolute inset-0 z-0 transition-opacity duration-300 ease-in-out bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] opacity-0 group-hover:opacity-100"></div>
                <FaInstagram className="relative z-10"/>
              </a>
              <a href="#" title="LinkedIn" className="flex items-center justify-center w-10 h-10 text-white bg-white/10 rounded-full text-[1.2rem] relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0 active:scale-95 hover:bg-[#0A66C2] hover:shadow-[0_5px_15px_rgba(10,102,194,0.4)]">
                <FaLinkedin />
              </a>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div>
            <h3 className="uppercase text-[1.2rem] font-bold mb-5 text-[#e11d48]">
              Quick Links
            </h3>
            <ul className="p-0 m-0 list-none">
              <li className="mb-3">
                <a href="/tournament.html" className="text-white text-[0.95rem] no-underline opacity-80 transition-all duration-300 ease-in-out hover:opacity-100 hover:text-[#fc4e5b] hover:pl-[5px]">Tournaments</a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-white text-[0.95rem] no-underline opacity-80 transition-all duration-300 ease-in-out hover:opacity-100 hover:text-[#fc4e5b] hover:pl-[5px]">Leaderboard</a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-white text-[0.95rem] no-underline opacity-80 transition-all duration-300 ease-in-out hover:opacity-100 hover:text-[#fc4e5b] hover:pl-[5px]">My Matches</a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-white text-[0.95rem] no-underline opacity-80 transition-all duration-300 ease-in-out hover:opacity-100 hover:text-[#fc4e5b] hover:pl-[5px]">Buy Pass</a>
              </li>
              <li className="mb-3">
                <a href="/news.html" className="text-white text-[0.95rem] no-underline opacity-80 transition-all duration-300 ease-in-out hover:opacity-100 hover:text-[#fc4e5b] hover:pl-[5px]">Blog</a>
              </li>
            </ul>
          </div>

          {/* Support Links Column */}
          <div>
            <h3 className="uppercase text-[1.2rem] font-bold mb-5 text-[#e11d48]">
              Support
            </h3>
            <ul className="p-0 m-0 list-none">
              <li className="mb-3">
                <a href="#" className="text-white text-[0.95rem] no-underline opacity-80 transition-all duration-300 ease-in-out hover:opacity-100 hover:text-[#fc4e5b] hover:pl-[5px]">Help Center</a>
              </li>
              <li className="mb-3">
                <Link to="/contact" className="text-white text-[0.95rem] no-underline opacity-80 transition-all duration-300 ease-in-out hover:opacity-100 hover:text-[#fc4e5b] hover:pl-[5px]">Contact Us</Link>
              </li>
              <li className="mb-3">
                <a href="#" className="text-white text-[0.95rem] no-underline opacity-80 transition-all duration-300 ease-in-out hover:opacity-100 hover:text-[#fc4e5b] hover:pl-[5px]">Terms Of Service</a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-white text-[0.95rem] no-underline opacity-80 transition-all duration-300 ease-in-out hover:opacity-100 hover:text-[#fc4e5b] hover:pl-[5px]">Privacy Policy</a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-white text-[0.95rem] no-underline opacity-80 transition-all duration-300 ease-in-out hover:opacity-100 hover:text-[#fc4e5b] hover:pl-[5px]">FAQs</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-[15px] text-center border-t border-[#1a1a1a]">
          <p className="text-[0.9rem] opacity-70">
            © 2025 Nuclianesports. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;