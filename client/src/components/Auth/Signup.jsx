import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && email && password && termsChecked) {
      setIsLoading(true);
      setTimeout(() => {
        toast.success('Account created successfully! Redirecting to login...', {
          style: {
            background: '#0a141d',
            color: '#fff',
            border: '1px solid #FC4E5B',
            borderRadius: '8px',
            padding: '12px',
          },
          iconTheme: {
            primary: '#E11D48',
            secondary: '#fff',
          },
        });
        setIsLoading(false);
        // In a real app, you would redirect here:
        // window.location.href = "/login";
      }, 1500);
    } else {
      toast.error('Please fill in all fields and agree to the terms', {
        style: {
          background: '#0a141d',
          color: '#fff',
          border: '1px solid #FC4E5B',
          borderRadius: '8px',
          padding: '12px',
        },
        iconTheme: {
          primary: '#E11D48',
          secondary: '#fff',
        },
      });
    }
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="font-Lex flex min-h-screen items-center justify-center bg-black/95 text-white pt-[10vh] px-4 sm:px-6 lg:px-12">
        <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="form-container overflow-hidden rounded-2xl bg-[#0a141d]/80 backdrop-blur-sm border border-white/10 p-6 sm:p-8 shadow-2xl transition-all duration-500 ease-in-out">
            <div className="mb-6 sm:mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#E11D48] shadow-md shadow-[#E11D48]/20">
                Nuclian<span className="text-white">Esports</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 mt-2">
                Join the ultimate gaming experience
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-5 sm:space-y-6">
                {/* Username Input */}
                <div className="relative">
                  <label htmlFor="signup-username" className="sr-only">Username</label>
                  <input 
                    type="text" 
                    id="signup-username" 
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label htmlFor="signup-email" className="sr-only">Email</label>
                  <input 
                    type="email" 
                    id="signup-email" 
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <label htmlFor="signup-password" className="sr-only">Password</label>
                  <input 
                    type="password" 
                    id="signup-password" 
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-700 text-[#E11D48] focus:ring-[#E11D48] transition-all duration-300"
                  />
                  <label htmlFor="terms" className="ml-2 text-xs sm:text-sm text-gray-400">
                    I agree to the
                    <a href="#" className="text-[#E11D48] hover:text-[#FC4E5B] transition-colors duration-300"> Terms of Service </a>
                    and
                    <a href="#" className="text-[#E11D48] hover:text-[#FC4E5B] transition-colors duration-300"> Privacy Policy</a>
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full rounded-lg bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] py-3 px-4 font-semibold text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#E11D48]/50"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
                
                <div className="flex items-center">
                  <div className="flex-1 border-t border-white/20"></div>
                  <span className="px-3 sm:px-4 text-xs sm:text-sm text-[#E11D48]">OR</span>
                  <div className="flex-1 border-t border-white/20"></div>
                </div>
                
                <button 
                  type="button" 
                  className="flex w-full items-center justify-center space-x-2 rounded-lg bg-white/90 py-3 px-4 font-semibold text-[#4285F4] shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4285F4]/50"
                >
                  <FaGoogle />
                  <span>Continue with Google</span>
                </button>
                
                <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-400">
                  Already have an account? 
                  <Link 
                    to="/login" 
                    className="group relative ml-1 font-semibold text-[#E11D48] transition-colors duration-300 hover:text-[#FC4E5B]"
                  >
                    Log in
                    <span className="absolute bottom-[-2px] left-0 h-0.5 w-0 bg-[#E11D48] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;