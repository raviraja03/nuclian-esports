import React from 'react';
import { FaInstagram, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const SiteFooter = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white pb-5 border-t border-[#1a1a1a] font-Lex mt-7">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Top Footer: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-5">
          
          {/* Brand Info */}
          <div className="">
            <div className="text-2xl sm:text-3xl font-bold mb-2">
              Nuclian<span className='text-[#E11D48]'>Esports</span>
            </div>
            <div className="text-sm opacity-70 mb-4">EST. 2025</div>
            <p className="text-sm sm:text-[0.95rem] leading-[1.6] opacity-80 mb-4">
              The ultimate esports tournament platform. Join competitions, win prizes, and dominate the leaderboards in India's premier gaming arena.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" title="Discord" className="flex items-center justify-center w-10 h-10 text-white bg-white/10 rounded-full text-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#5865F2] hover:shadow-lg">
                <FaDiscord />
              </a>
              <a href="#" title="Twitter" className="flex items-center justify-center w-10 h-10 text-white bg-white/10 rounded-full text-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-black hover:shadow-lg">
                <FaXTwitter />
              </a>
              <a href="#" title="Instagram" className="group flex items-center justify-center w-10 h-10 text-white bg-white/10 rounded-full text-lg relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1">
                <div className="absolute inset-0 z-0 transition-opacity duration-300 ease-in-out bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] opacity-0 group-hover:opacity-100"></div>
                <FaInstagram className="relative z-10"/>
              </a>
              <a href="#" title="LinkedIn" className="flex items-center justify-center w-10 h-10 text-white bg-white/10 rounded-full text-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#0A66C2] hover:shadow-lg">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="uppercase text-lg sm:text-xl font-bold mb-4 text-[#e11d48]">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/tournament.html" className="text-white text-sm sm:text-[0.95rem] hover:text-[#fc4e5b]">Tournaments</a></li>
              <li><a href="#" className="text-white text-sm sm:text-[0.95rem] hover:text-[#fc4e5b]">Leaderboard</a></li>
              <li><a href="#" className="text-white text-sm sm:text-[0.95rem] hover:text-[#fc4e5b]">My Matches</a></li>
              <li><a href="#" className="text-white text-sm sm:text-[0.95rem] hover:text-[#fc4e5b]">Buy Pass</a></li>
              <li><a href="/news.html" className="text-white text-sm sm:text-[0.95rem] hover:text-[#fc4e5b]">Blog</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="uppercase text-lg sm:text-xl font-bold mb-4 text-[#e11d48]">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white text-sm sm:text-[0.95rem] hover:text-[#fc4e5b]">Help Center</a></li>
              <li><Link to="/contact" className="text-white text-sm sm:text-[0.95rem] hover:text-[#fc4e5b]">Contact Us</Link></li>
              <li><a href="#" className="text-white text-sm sm:text-[0.95rem] hover:text-[#fc4e5b]">Terms Of Service</a></li>
              <li><a href="#" className="text-white text-sm sm:text-[0.95rem] hover:text-[#fc4e5b]">Privacy Policy</a></li>
              <li><a href="#" className="text-white text-sm sm:text-[0.95rem] hover:text-[#fc4e5b]">FAQs</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-4 text-center border-t border-[#1a1a1a]">
          <p className="text-sm sm:text-[0.9rem] opacity-70">© 2025 Nuclianesports. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
