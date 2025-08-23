import React, { useState } from 'react';
import { FaWallet, FaCreditCard, FaCoins, FaGift, FaHistory, FaPlusCircle, FaTimes, FaPlus, FaGamepad, FaBolt, FaMoneyBillWave, FaShoppingCart } from 'react-icons/fa';

// --- Data for the Wallet Cards and Transaction History ---
const cardsData = [
  { icon: <FaCreditCard />, title: "Bank Card", currency: "USD", balance: "$1,250" },
  { icon: <FaCoins />, title: "Coins", currency: "COINS", balance: "500" },
  { icon: <FaGift />, title: "Gift Card", currency: "INR", balance: "₹2,000" },
];

const transactionsData = [
  { type: 'credit', icon: <FaPlus />, title: "Coins Purchased", date: "Today, 14:30", amount: "+200 Coins" },
  { type: 'debit', icon: <FaGamepad />, title: "Game Purchase", date: "Yesterday, 18:45", amount: "-150 Coins" },
  { type: 'credit', icon: <FaGift />, title: "Daily Reward", date: "Aug 1, 09:15", amount: "+50 Coins" },
  { type: 'debit', icon: <FaBolt />, title: "Power-up", date: "Jul 30, 16:20", amount: "-75 Coins" },
  { type: 'credit', icon: <FaMoneyBillWave />, title: "Referral Bonus", date: "Jul 28, 11:30", amount: "+100 Coins" },
  { type: 'debit', icon: <FaShoppingCart />, title: "In-game Purchase", date: "Jul 25, 20:15", amount: "-120 Coins" },
];


// --- Transaction Modal Sub-Component ---
const TransactionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-300 ease-in-out ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      onClick={onClose}
    >
      <div 
        className={`w-[95%] max-w-[500px] max-h-[90vh] overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-[0_15px_50px_rgba(255,45,45,0.25)] transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-[#E11D48] p-5">
          <h2 className="text-2xl font-bold">Transaction History</h2>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-black/20 transition-all duration-300 ease-in-out hover:rotate-90 hover:bg-black/40">
            <FaTimes className="text-lg" />
          </button>
        </div>
        <div className="max-h-[65vh] overflow-y-auto p-5">
          <div className="flex flex-col gap-4">
            {transactionsData.map((item, index) => (
              <div key={index} className={`flex items-center rounded-2xl border border-white/5 bg-white/5 p-4 transition-all duration-300 ease-in-out hover:translate-x-1 hover:border-[#ff2d2d]/30 hover:bg-[#ff2d2d]/10 ${item.type === 'credit' ? 'text-[#28a745]' : 'text-[#dc3545]'}`}>
                <div className={`mr-4 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${item.type === 'credit' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.date}</p>
                </div>
                <div className="text-lg font-bold">{item.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Wallet Page Component ---
const WalletPage = () => {
    const [isWalletOpen, setIsWalletOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTransactionClick = (e) => {
      e.stopPropagation(); // Prevent wallet from closing when clicking the button
      setIsModalOpen(true);
    };

    return (
        <div className="flex min-h-screen mt-20 w-full items-center justify-center bg-black p-5 font-['Lexend',_sans-serif] text-white">
            <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="w-full max-w-[450px]">
                <header className="mb-8 text-center">
                    <h1 className="mb-2 text-[#E11D48] text-4xl font-extrabold tracking-wide shadow-[#ff2d2d]/50 [text-shadow:0_0_15px_var(--tw-shadow-color)]">
                        Digital Wallet
                    </h1>
                    <p className="text-base font-medium text-gray-400">Tap the wallet to access your cards</p>
                </header>

                <div className="relative mb-6 cursor-pointer [perspective:1000px]" onClick={() => setIsWalletOpen(!isWalletOpen)}>
                    <div className={`absolute top-0 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-white/30 transition-opacity duration-300 ${isWalletOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                    
                    <div className={`relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0_16px_36px_rgba(252,78,91,0.15)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isWalletOpen ? 'h-[500px] shadow-[0_16px_36px_rgba(252,78,91,0.15)]' : 'h-[190px]'}`}>
                        
                        {/* Closed State */}
                        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${isWalletOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 group">
                                <FaWallet className="text-4xl text-white/80 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:text-[#ff2d2d]" />
                            </div>
                            <h2 className="mb-2 text-2xl font-semibold">My Wallet</h2>
                            <p className="text-sm text-gray-400">Tap to open</p>
                        </div>
                        
                        {/* Open State */}
                        <div className={`absolute inset-0 flex flex-col transition-opacity duration-300 ${isWalletOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <div className="flex flex-grow flex-col items-center justify-center gap-4 p-5">
                                {cardsData.map((card, index) => (
                                    <div key={index} className={`w-[90%] rounded-2xl bg-[#E11D48] p-4 shadow-lg transition-all duration-500 ease-in-out ${isWalletOpen ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`} style={{ transitionDelay: `${(index + 1) * 100}ms`}}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="mr-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/20">
                                                    <span className="text-2xl">{card.icon}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold">{card.title}</h3>
                                                    <p className="text-sm opacity-80">{card.currency}</p>
                                                </div>
                                            </div>
                                            <div className="text-xl font-bold">{card.balance}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={`px-5 pb-5 mb-20 transition-all duration-500 ease-in-out ${isWalletOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`} style={{ transitionDelay: '400ms' }}>
                                <button onClick={handleTransactionClick} className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/10 py-3.5 text-base font-medium transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-[#FC4E5B]">
                                    <FaHistory className="transition-transform duration-300 ease-in-out group-hover:rotate-360"/>
                                    View Transactions
                                </button>
                            </div>
                            <footer className="absolute bottom-0 w-full border-t border-white/20 bg-[#FC4E5B]/80 p-4 text-center backdrop-blur-sm">
                                <p className="text-base opacity-90">Total Balance</p>
                                <div className="text-lg font-bold">$1,500</div>
                            </footer>
                        </div>
                    </div>
                </div>

                <button className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/20 bg-transparent p-4 text-lg font-medium shadow-lg backdrop-blur-xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-transparent hover:bg-[#E11D48] cursor-pointer">
                    <FaPlusCircle className="text-xl transition-transform duration-300 ease-in-out group-hover:scale-125" />
                    Purchase Additional Coins
                </button>
            </div>
        </div>
    );
};

export default WalletPage;