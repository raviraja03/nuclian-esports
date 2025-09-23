import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Button_2 from "../components/Button/Button_2";
import {
  useForgotPasswordMutation,
  useVerifyAndResetPasswordMutation,
} from "../globalState/api/authApi";

import { TOAST_DESIGN_SUCCESS, TOAST_DESIGN_ERROR } from "../constant";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();



  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyAndResetPassword] = useVerifyAndResetPasswordMutation();

  // Step 1 - Request OTP
  const onSubmitEmail = async ({ email }) => {
    try {
      const res = await forgotPassword({ email }).unwrap();
      console.log(res);
      toast.success("OTP sent to your email!", TOAST_DESIGN_SUCCESS);
      setEmail(email);
      setStep(2);
    } catch (err) {
      toast.error(
        err?.data?.message || "Failed to send OTP",
        TOAST_DESIGN_ERROR
      );
    }
  };

  // Step 2 - Reset password
  const onSubmitReset = async (data) => {
    try {
      await verifyAndResetPassword({
        email: email,
        emailOtp: data.code,
        newPassword: data.password,
      }).unwrap();
      toast.success("Password reset successfully!", TOAST_DESIGN_SUCCESS);
      navigate("/login");
    } catch (er) {
      toast.error(er?.data?.message, TOAST_DESIGN_ERROR);
    }
  };

  const handleResend = async () => {
    try {
      await forgotPassword({ email }).unwrap();
      toast.success("OTP resent!", TOAST_DESIGN_SUCCESS);
    } catch (err) {
      toast.error(
        err?.data?.message || "Failed to resend OTP",
        TOAST_DESIGN_ERROR
      );
    }
  };

  return (
    <div className="font-Lex bg-black/95 text-white min-h-screen mt-[12vh] px-4 sm:px-6 lg:px-12">
      <div className="max-w-md mx-auto">
        <Link
          to="/login"
          className="inline-flex items-center text-sm sm:text-base text-gray-300 hover:text-[#FC4E5B] transition-colors duration-300 mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Login
        </Link>

        <section className="bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-[#E11D48]/50 p-6 sm:p-8 shadow-lg hover:shadow-xl hover:shadow-[#E11D48]/20 transition-all duration-300">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] bg-clip-text text-transparent mb-2">
              Forgot Password
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-6">
              {step === 1
                ? "Enter your email to receive an OTP."
                : "Enter the OTP and your new password."}
            </p>

            {/* Step 1: Email */}
            {step === 1 && (
              <form
                onSubmit={handleSubmit(onSubmitEmail)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /.+@.+\..+/,
                        message: "Enter a valid email",
                      },
                    })}
                    className="w-full bg-[#1a2634]/50 border border-white/20 rounded-lg py-2 px-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#FC4E5B]"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <Button_2
                  content={isSubmitting ? "Sending..." : "Send OTP"}
                  disabled={isSubmitting}
                />
              </form>
            )}

            {/* Step 2: OTP + Password Reset */}
            {step === 2 && (
              <form
                onSubmit={handleSubmit(onSubmitReset)}
                className="space-y-4"
              >
                {/* enter your email */}

                {/* OTP Field */}

                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    OTP Code
                  </label>
                  <input
                    type="text"
                    {...register("code", { required: "OTP is required" })}
                    className="w-full bg-[#1a2634]/50 border border-white/20 rounded-lg py-2 px-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#FC4E5B]"
                    placeholder="Enter OTP"
                  />
                  {errors.code && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.code.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="w-full bg-[#1a2634]/50 border border-white/20 rounded-lg py-2 px-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#FC4E5B]"
                    placeholder="Enter new password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-sm"
                  >
                    {isSubmitting ? "Resetting..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    onClick={handleResend}
                    className="flex-1 bg-[#1a2634] border border-gray-600 text-gray-300 font-semibold py-2 rounded-lg shadow-md hover:border-[#FC4E5B] hover:text-[#FC4E5B] transition-all duration-300 text-sm"
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForgotPassword;
