import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

// bg-gradient-to-br from-[rgba(40,40,40,0.9)] to-[rgba(25,25,25,0.95)]

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      // Reset form and hide success message after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        e.target.reset();
      }, 3000);
    }, 1000);
  };
  
  const socialLinks = [
    { icon: <FaXTwitter />, href: '#', title: 'Twitter', hoverClass: 'hover:bg-[#000000] hover:shadow-[0_5px_15px_rgba(0,0,0,0.4)]' },
    { icon: <FaFacebookF />, href: '#', title: 'Facebook', hoverClass: 'hover:bg-[#1877F2] hover:shadow-[0_5px_15px_rgba(24,119,242,0.4)]' },
    { icon: <FaInstagram />, href: '#', title: 'Instagram', specialClass: 'instagram-link', hoverClass: 'hover:shadow-[0_5px_15px_rgba(131,58,180,0.4)]' },
    { icon: <FaLinkedinIn />, href: '#', title: 'LinkedIn', hoverClass: 'hover:bg-[#0A66C2] hover:shadow-[0_5px_15px_rgba(10,102,194,0.4)]' },
  ];
  
  // Base classes for form inputs for reusability
  const inputBaseClasses = "w-full p-3.5 bg-[rgba(30,30,30,0.7)] border border-[#333333] rounded-lg text-[#ffffff] font-['Lexend',sans-serif] text-base transition-all duration-300 focus:border-[#fc4e5b] focus:outline-none focus:ring-2 focus:ring-[#fc4e5b]/30 hover:border-[#fc4e5b]";

// bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]
  return (
    <div className="flex mt-14 flex-col items-center justify-center min-h-[50vh] p-5 font-['Lexend',sans-serif] bg-black text-[#ffffff]"> 
      <div className="relative w-full max-w-5xl mx-auto my-5">

        <div className="relative grid w-full grid-cols-1 overflow-hidden bg-[rgba(20,20,20,0.8)] rounded-2xl backdrop-blur-lg lg:grid-cols-[1fr_1.8fr] gap-7">
          {/* Left Panel: Contact Info */}
          <div className="flex flex-col p-8 bg-gradient-to-br from-[rgba(40,40,40,0.9)] to-[rgba(25,25,25,0.95)] ">
            <h2 className="relative pb-4 mb-8 text-3xl font-bold bg-[#E11D48] bg-clip-text text-transparent sm:text-4xl">
              Get <span className='text-white'>In Touch</span>
              <span className="absolute bottom-0 left-0 w-16 h-1 rounded-full bg-[#E11D48]"></span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="mt-1 text-xl text-[#fc4e5b]" />
                <div>
                  <h3 className="text-lg font-semibold text-[#ffffff]">Our Location</h3>
                  <p className="text-[#e0e0e0]">K.R. Mangalam University<br/>Sohna Road, Gurugram<br/>Haryana, India.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaPhoneAlt className="mt-1 text-xl text-[#fc4e5b]" />
                <div>
                  <h3 className="text-lg font-semibold text-[#ffffff]">Phone Number</h3>
                  <p className="text-[#e0e0e0]">+91 (555) 123-4567<br/>+91 (555) 987-6543</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <FaEnvelope className="mt-1 text-xl text-[#fc4e5b]" />
                <div>
                  <h3 className="text-lg font-semibold text-[#ffffff]">Email Address</h3>
                  <p className="text-[#e0e0e0]">contact@nuclianesports.com<br/>support@nuclianesports.com</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-auto pt-7">
              {socialLinks.map((link, index) => (
                 <a key={index} href={link.href} title={link.title} className={`relative group flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95 text-[#ffffff] ${link.hoverClass} ${link.specialClass || ''}`}>
                  {link.specialClass === 'instagram-link' && <div className="absolute inset-0 z-0 transition-opacity duration-300 rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#F77737] opacity-0 group-hover:opacity-100" />}
                  <span className="relative z-10">{link.icon}</span>
                 </a>
              ))}
            </div>
          </div>

          {/* Right Panel: Contact Form */}
          <div className="p-8">
            <h2 className="mb-8 text-2xl font-semibold text-[#ffffff] sm:text-3xl">Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-[#e0e0e0]">First Name</label>
                  <input type="text" id="firstName" name="firstName" required className={inputBaseClasses} />
                </div>
                 <div>
                  <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-[#e0e0e0]">Last Name</label>
                  <input type="text" id="lastName" name="lastName" required className={inputBaseClasses} />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#e0e0e0]">Email Address</label>
                  <input type="email" id="email" name="email" required className={inputBaseClasses} />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-[#e0e0e0]">Phone Number</label>
                  <input type="tel" id="phone" name="phone" placeholder="+91" className={inputBaseClasses} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-[#e0e0e0]">Your Message</label>
                  <textarea id="message" name="message" placeholder="How can we help you?" required rows="4" className={`${inputBaseClasses} resize-y min-h-[120px]`}></textarea>
                </div>
              </div>
              
              <div className="mt-6">
                <button type="submit" className="inline-flex items-center gap-3 px-8 py-3.5 text-base font-semibold text-white border-none rounded-lg cursor-pointer group bg-[#e11d48] shadow-[0_4px_15px_rgba(230,57,70,0.3)] transition-all duration-300 hover:from-[#c1121f] hover:to-[#e63946] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(230,57,70,0.4)] active:translate-y-0">
                  Send Message
                  <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              {formSubmitted && (
                 <div className="flex items-center justify-center gap-3 p-4 mt-5 text-center text-green-400 border rounded-lg bg-green-500/10 border-green-500/30">
                   <FaCheckCircle />
                   Your message has been sent successfully!
                 </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;