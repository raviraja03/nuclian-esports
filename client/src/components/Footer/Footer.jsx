import React from 'react';
import { FaInstagram, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const SiteFooter = () => {
  return (
    <footer className="bg-black/95 text-white pb-6 sm:pb-8 border-t border-white/10 font-Lex mt-8 sm:mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Top Footer: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-16 mb-6 sm:mb-8">
          
          {/* Brand Info */}
          <div className="col-span-1">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 tracking-tight">
              Nuclian<span className="text-[#E11D48]">Esports</span>
            </div>
            <div className="text-xs sm:text-sm opacity-70 mb-3 sm:mb-4 tracking-wide">EST. 2025</div>
            <p className="text-sm sm:text-base leading-relaxed opacity-80 mb-4 sm:mb-6 max-w-md">
              The ultimate esports tournament platform. Join competitions, win prizes, and dominate the leaderboards in India's premier gaming arena.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" title="Discord" className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 text-white bg-white/10 rounded-full text-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#5865F2] hover:shadow-lg hover:shadow-[#5865F2]/30 backdrop-blur-sm">
                <FaDiscord />
              </a>
              <a href="#" title="Twitter" className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 text-white bg-white/10 rounded-full text-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-800/30 backdrop-blur-sm">
                <FaXTwitter />
              </a>
              <a href="#" title="Instagram" className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 text-white bg-white/10 rounded-full text-lg relative overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 backdrop-blur-sm">
                <div className="absolute inset-0 z-0 transition-all duration-300 ease-in-out bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] opacity-0 group-hover:opacity-100 rounded-full"></div>
                <FaInstagram className="relative z-10 transition-transform duration-300 group-hover:scale-110"/>
              </a>
              <a href="#" title="LinkedIn" className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 text-white bg-white/10 rounded-full text-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#0A66C2] hover:shadow-lg hover:shadow-[#0A66C2]/30 backdrop-blur-sm">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="uppercase text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-[#E11D48] tracking-wide">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="/tournament.html" className="text-white/90 text-sm sm:text-base hover:text-[#FC4E5B] transition-colors duration-300 hover:underline underline-offset-4">Tournaments</a></li>
              <li><a href="#" className="text-white/90 text-sm sm:text-base hover:text-[#FC4E5B] transition-colors duration-300 hover:underline underline-offset-4">Leaderboard</a></li>
              <li><a href="#" className="text-white/90 text-sm sm:text-base hover:text-[#FC4E5B] transition-colors duration-300 hover:underline underline-offset-4">My Matches</a></li>
              <li><a href="#" className="text-white/90 text-sm sm:text-base hover:text-[#FC4E5B] transition-colors duration-300 hover:underline underline-offset-4">Buy Pass</a></li>
              <li><a href="/news.html" className="text-white/90 text-sm sm:text-base hover:text-[#FC4E5B] transition-colors duration-300 hover:underline underline-offset-4">Blog</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-span-1">
            <h3 className="uppercase text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 text-[#E11D48] tracking-wide">Support</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-white/90 text-sm sm:text-base hover:text-[#FC4E5B] transition-colors duration-300 hover:underline underline-offset-4">Help Center</a></li>
              <li><Link to="/contact" className="text-white/90 text-sm sm:text-base hover:text-[#FC4E5B] transition-colors duration-300 hover:underline underline-offset-4">Contact Us</Link></li>
              <li><a href="#" className="text-white/90 text-sm sm:text-base hover:text-[#FC4E5B] transition-colors duration-300 hover:underline underline-offset-4">Terms Of Service</a></li>
              <li><a href="#" className="text-white/90 text-sm sm:text-base hover:text-[#FC4E5B] transition-colors duration-300 hover:underline underline-offset-4">Privacy Policy</a></li>
              <li><a href="#" className="text-white/90 text-sm sm:text-base hover:text-[#FC4E5B] transition-colors duration-300 hover:underline underline-offset-4">FAQs</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-4 sm:pt-6 text-center border-t border-white/10">
          <p className="text-xs sm:text-sm opacity-70 tracking-wide">© 2025 NuclianEsports. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;