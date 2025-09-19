import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Button_2 from '../Button/Button_2'; // Assuming Button_2 is defined elsewhere
import { useGetMyPaymentsQuery } from "../../globalState/api/paymentApi";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState('settings');
    const { data:paymentData={}, isLoading, isError } = useGetMyPaymentsQuery();
    const {data:paymentHistory}=paymentData
    





  // Profile Edit Form
  const { register: registerProfile, handleSubmit: handleProfileSubmit, formState: { errors: profileErrors, isSubmitting: isProfileSubmitting } } = useForm({
    defaultValues: {
      username: user?.name || '',
      email: user?.email || '',
      mobile: user?.phoneNumber || '',
    }
  });

  const onProfileSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Profile updated successfully!', {
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
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
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

  // Password Change Form
  const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting }, watch } = useForm();

  const onPasswordSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('New passwords do not match', {
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
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Password changed successfully!', {
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
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
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

  const handleDisableAccount = () => {
    toast.success('Account disabled successfully!', {
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
  };

  const handleDeleteAccount = () => {
    toast.error('Account deleted successfully!', {
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
  };



  return (
    <>
      <div className="font-Lex bg-black/95 text-white min-h-screen mt-[10vh] px-4 sm:px-6 lg:px-12 ">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex border-b border-white/10 mb-6 sm:mb-8">
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 px-4 text-base sm:text-lg font-semibold ${
                activeTab === 'settings'
                  ? 'text-[#E11D48] border-b-2 border-[#E11D48]'
                  : 'text-gray-300 hover:text-[#FC4E5B]'
              } transition-colors duration-300`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex-1 py-3 px-4 text-base sm:text-lg font-semibold ${
                activeTab === 'payments'
                  ? 'text-[#E11D48] border-b-2 border-[#E11D48]'
                  : 'text-gray-300 hover:text-[#FC4E5B]'
              } transition-colors duration-300`}
            >
              Payment History
            </button>
          </div>

          {activeTab === 'settings' && (
            <div className="bg-[#0a141d]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl hover:shadow-[#E11D48]/20 transition-all duration-300 animate-in fade-in duration-500">
              {/* Edit Profile Form */}
              <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#E11D48] mb-4 text-shadow-sm">Edit Profile</h2>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                  <input
                    id="username"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300"
                    {...registerProfile('username', { required: 'Username is required', minLength: { value: 3, message: 'Minimum 3 characters' } })}
                  />
                  {profileErrors.username && <p className="mt-1 text-xs text-[#FC4E5B]">{profileErrors.username.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300"
                    {...registerProfile('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                  />
                  {profileErrors.email && <p className="mt-1 text-xs text-[#FC4E5B]">{profileErrors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-2">Mobile Number</label>
                  <input
                    id="mobile"
                    type="tel"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300"
                    {...registerProfile('mobile', { required: 'Mobile number is required', pattern: { value: /^\d{10}$/, message: 'Invalid mobile number' } })}
                  />
                  {profileErrors.mobile && <p className="mt-1 text-xs text-[#FC4E5B]">{profileErrors.mobile.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isProfileSubmitting}
                  className="w-full rounded-lg bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] py-3 px-4 font-semibold text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 animate-pulse-hover"
                >
                  {isProfileSubmitting ? 'Updating...' : 'Update Profile'}
                </button>
              </form>

              <div className="h-1 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] rounded-full my-8"></div>

              {/* Change Password Form */}
              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#E11D48] mb-4 text-shadow-sm">Change Password</h2>
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                  <input
                    id="currentPassword"
                    type="password"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300"
                    {...registerPassword('currentPassword', { required: 'Current password is required' })}
                  />
                  {passwordErrors.currentPassword && <p className="mt-1 text-xs text-[#FC4E5B]">{passwordErrors.currentPassword.message}</p>}
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300"
                    {...registerPassword('newPassword', { required: 'New password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                  />
                  {passwordErrors.newPassword && <p className="mt-1 text-xs text-[#FC4E5B]">{passwordErrors.newPassword.message}</p>}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300"
                    {...registerPassword('confirmPassword', { required: 'Confirm password is required', validate: (val) => val === watch('newPassword') || 'Passwords do not match' })}
                  />
                  {passwordErrors.confirmPassword && <p className="mt-1 text-xs text-[#FC4E5B]">{passwordErrors.confirmPassword.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isPasswordSubmitting}
                  className="w-full rounded-lg bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] py-3 px-4 font-semibold text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 animate-pulse-hover"
                >
                  {isPasswordSubmitting ? 'Changing...' : 'Change Password'}
                </button>
              </form>

              <div className="h-1 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] rounded-full my-8"></div>

              {/* Account Actions */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#E11D48] mb-4 text-shadow-sm">Account Actions</h2>
                <button
                  onClick={handleDisableAccount}
                  className="w-full rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-700 py-3 px-4 font-semibold text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 animate-pulse-hover"
                >
                  Disable Account
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full rounded-lg bg-gradient-to-r from-red-600 to-red-700 py-3 px-4 font-semibold text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 animate-pulse-hover"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="bg-[#0a141d]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl hover:shadow-[#E11D48]/20 transition-all duration-300 animate-in fade-in duration-500">
              <h2 className="text-xl sm:text-2xl font-bold text-[#E11D48] mb-4 sm:mb-6 text-shadow-sm">Payment History</h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E11D48]"></div>
                </div>
              ) : isError ? (
                <div className="text-center py-8">
                  <p className="text-red-400">Error loading payment history</p>
                </div>
              ) : !paymentHistory || paymentHistory.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-300">No payment history found</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr className="bg-white/5">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Amount</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Status</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Payment Method</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentHistory.map((payment,index) => (
                          <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                            <td className="px-4 py-3 text-sm text-white">
                              {new Date(payment.createdAt).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="px-4 py-3 text-sm text-white font-semibold">₹{payment.amount}</td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                payment.status === 'paid' 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : payment.status === 'pending'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-white capitalize">
                              {payment?.metadata?.order_meta?.payment_methods || 'N/A'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-4">
                    {paymentHistory.map((payment,index) => (
                      <div key={index} className="bg-[#1a2634]/50 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-white font-semibold text-lg">₹{payment.amount}</p>
                            <p className="text-gray-400 text-sm">
                              {new Date(payment.createdAt).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            payment.status === 'paid' 
                              ? 'bg-green-500/20 text-green-400' 
                              : payment.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-300">
                          <span className="font-medium">Payment Method: </span>
                          <span className="capitalize">{payment?.metadata?.order_meta?.payment_methods || 'N/A'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;



          // {activeTab === 'tournaments' && (
          //   <div className="bg-[#0a141d]/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl hover:shadow-[#E11D48]/20 transition-all duration-300 animate-in fade-in duration-500">
          //     <h2 className="text-xl sm:text-2xl font-bold text-[#E11D48] mb-4 sm:mb-6 text-shadow-sm">Registered Tournaments</h2>
          //     {registeredTournaments.length === 0 ? (
          //       <p className="text-gray-300 text-sm sm:text-base text-center">No tournaments registered yet.</p>
          //     ) : (
          //       <>
          //         <div className="hidden sm:block overflow-x-auto">
          //           <table className="w-full table-auto border-collapse">
          //             <thead>
          //               <tr className="bg-white/5">
          //                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Title</th>
          //                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Type</th>
          //                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Game</th>
          //                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Entry Fee</th>
          //                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Status</th>
          //                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Room ID</th>
          //                 <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Actions</th>
          //               </tr>
          //             </thead>
          //             <tbody>
          //               {registeredTournaments.map((tournament) => {
          //                 const { isAvailable, message } = getRoomIdStatus(tournament.schedule.checkInStart);
          //                 return (
          //                   <tr key={tournament.id} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
          //                     <td className="px-4 py-3 text-sm text-white">{tournament.title}</td>
          //                     <td className="px-4 py-3 text-sm text-white capitalize">{tournament.type}</td>
          //                     <td className="px-4 py-3 text-sm text-white">{tournament.game}</td>
          //                     <td className="px-4 py-3 text-sm text-white">₹{tournament.entryFee.currency}</td>
          //                     <td className="px-4 py-3 text-sm text-white capitalize">{tournament.status.replace('-', ' ')}</td>
          //                     <td className="px-4 py-3 text-sm text-white">
          //                       {isAvailable ? (
          //                         <span className="font-mono">{tournament.roomId}</span>
          //                       ) : (
          //                         <span className="text-gray-400" aria-live="polite">{message || 'Not Available'}</span>
          //                       )}
          //                     </td>
          //                     <td className="px-4 py-3 text-sm text-white">
          //                       <Link to={`/tournaments/${tournament.id}`}>
          //                         <Button_2
          //                           content="View Details"
          //                           className="bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] hover:from-[#FC4E5B] hover:to-[#E11D48] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm animate-pulse-hover"
          //                         />
          //                       </Link>
          //                     </td>
          //                   </tr>
          //                 );
          //               })}
          //             </tbody>
          //           </table>
          //         </div>
                  
          //         <div className="sm:hidden space-y-4">
          //           {registeredTournaments.map((tournament) => {
          //             const { isAvailable, message } = getRoomIdStatus(tournament.schedule.checkInStart);
          //             return (
          //               <div key={tournament.id} className="bg-[#1a2634]/50 rounded-lg p-4 border border-white/10 animate-in slide-in-from-bottom-10 duration-300">
          //                 <h3 className="text-base font-semibold text-[#E11D48] mb-2">{tournament.title}</h3>
          //                 <div className="space-y-2 text-sm">
          //                   <div className="flex justify-between">
          //                     <span className="text-gray-300">Type:</span>
          //                     <span className="text-white capitalize">{tournament.type}</span>
          //                   </div>
          //                   <div className="flex justify-between">
          //                     <span className="text-gray-300">Game:</span>
          //                     <span className="text-white">{tournament.game}</span>
          //                   </div>
          //                   <div className="flex justify-between">
          //                     <span className="text-gray-300">Entry Fee:</span>
          //                     <span className="text-white">₹{tournament.entryFee.currency}</span>
          //                   </div>
          //                   <div className="flex justify-between">
          //                     <span className="text-gray-300">Status:</span>
          //                     <span className="text-white capitalize">{tournament.status.replace('-', ' ')}</span>
          //                   </div>
          //                   <div className="flex justify-between">
          //                     <span className="text-gray-300">Room ID:</span>
          //                     <span className={isAvailable ? 'text-white font-mono' : 'text-gray-400'} aria-live="polite">
          //                       {isAvailable ? tournament.roomId : (message || 'Not Available')}
          //                     </span>
          //                   </div>
          //                   <div className="pt-2">
          //                     <Link to={`/tournaments/${tournament.id}`}>
          //                       <Button_2
          //                         content="View Details"
          //                         className="w-full bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] hover:from-[#FC4E5B] hover:to-[#E11D48] text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm animate-pulse-hover"
          //                       />
          //                     </Link>
          //                   </div>
          //                 </div>
          //               </div>
          //             );
          //           })}
          //         </div>
          //       </>
          //     )}
          //   </div>
          // )}