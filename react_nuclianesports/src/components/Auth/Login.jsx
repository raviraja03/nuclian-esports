import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa'; // Using react-icons for a cleaner Google logo
import { Link } from 'react-router-dom';

// A self-contained component for the custom alert popup
const CustomAlert = ({ message, onClose }) => {
    if (!message) return null;
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
            <div className="flex flex-col items-center rounded-2xl bg-[#111] p-8 text-center text-lg font-bold text-[#ff2d2d] shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
                <p>{message}</p>
                <button 
                    onClick={onClose} 
                    className="mt-6 cursor-pointer rounded-lg border-none bg-[#ff2d2d] py-2 px-6 font-bold text-white"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

// The main login page component
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            setIsLoading(true);
            setTimeout(() => {
                setAlertMessage('Login successful! Redirecting to dashboard...');
                setIsLoading(false);
            }, 1500);
        } else {
            setAlertMessage('Please fill in both email and password');
        }
    };

    return (
        <>
            <CustomAlert message={alertMessage} onClose={() => setAlertMessage('')} />
            <div className="font-['Lexend',_sans-serif] flex mt-20 items-center justify-center bg-black text-white overflow-x-hidden">
                <div className="relative z-10 mx-4 w-full max-w-md px-6 py-8">
                    <div className="form-container overflow-hidden rounded-2xl bg-white/0 p-8 shadow-2xl backdrop-blur-lg transition-all duration-500 ease-in-out">
                        <div className="mb-8 text-center">
                            <h1 className="form-title mb-2 bg-clip-text text-4xl font-bold tracking-wider text-[#E11D48] shadow-[#ff2d2d55] [text-shadow:0_0_16px_var(--tw-shadow-color)]">
                                Nuclian Esports
                            </h1>
                            <p className="text-gray-300">Join the ultimate gaming experience</p>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                {/* Email Input with Floating Label */}
                                <div className="relative pt-4">
                                    <input 
                                        type="email" 
                                        id="login-email" 
                                        className="peer w-full rounded-lg border border-gray-300/20 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ff2d2d]" 
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                                
                                {/* Password Input with Floating Label */}
                                <div className="relative pt-4">
                                    <input 
                                        type="password" 
                                        id="login-password" 
                                        className="peer w-full rounded-lg border border-gray-300/20 bg-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ff2d2d]" 
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                    />
                                    <div className="mt-1 text-right">
                                        <a href="#" className="text-xs text-gray-400 hover:text-[#E11D48]">Forgot password?</a>
                                    </div>
                                </div>
                                
                                <button type="submit" className="w-full rounded-lg bg-[#E11D48] py-3 px-4 font-medium text-white shadow-[0_4px_15px_#ff2d2d44] transition-all duration-300 ease-in-out hover:bg-[#FC4E5B] hover:shadow-[0_6px_20px_#ff2d2d99] cursor-pointer">
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                                
                                <div className="my-4 flex items-center">
                                    <div className="flex-1 border-t border-gray-400/30"></div>
                                    <span className="px-4 text-sm text-gray-400">OR</span>
                                    <div className="flex-1 border-t border-gray-400/30"></div>
                                </div>
                                
                                <button type="button" className="flex w-full items-center justify-center space-x-2 rounded-lg bg-white py-3 px-4 font-medium text-[#4285F4] transition-all duration-300 ease-in-out hover:shadow-[0_2px_10px_rgba(0,0,0,0.2)] cursor-pointer">
                                    <FaGoogle />
                                    <span>Continue with Google</span>
                                </button>
                                
                                <div className="mt-6 text-center text-sm text-gray-400">
                                    Don't have an account? 
                                    <Link to='/signup' className="group relative ml-1 cursor-pointer font-medium text-[#E11D48] transition-colors duration-300 ease-in-out hover:text-white">
                                        Sign up
                                        <span className="absolute bottom-[-2px] left-0 h-0.5 w-0 bg-[#E11D48] transition-all duration-300 ease-in-out group-hover:w-full"></span>
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

export default Login;