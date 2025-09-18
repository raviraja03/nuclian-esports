import { FaGoogle } from "react-icons/fa";
import { Link ,useNavigate} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../globalState/slices/auth";
import {useSignupMutation} from "../../globalState/api/authApi"
const Signup = () => {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {

      const response = await signup({
        name: data.username,
        email: data.email,
        password: data.password,
        phoneNumber: data.phone,
      }).unwrap();

      toast.success("Account created successfully!", {
        style: {
          background: "#0a141d",
          color: "#fff",
          border: "1px solid #FC4E5B",
          borderRadius: "8px",
          padding: "12px",
        },
        iconTheme: {
          primary: "#E11D48",
          secondary: "#fff",
        },
      });
      dispatch(setCredentials({ user: response.data }));
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(
        error.data.message || "An error occurred. Please try again.",
        {
          style: {
            background: "#0a141d",
            color: "#fff",
            border: "1px solid #FC4E5B",
            borderRadius: "8px",
            padding: "12px",
          },
          iconTheme: {
            primary: "#E11D48",
            secondary: "#fff",
          },
        }
      );
    }
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="font-Lex flex min-h-screen items-center justify-center bg-black/95 text-white mt-[6vh] px-4 sm:px-6 lg:px-12">
        <div className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="form-container overflow-hidden rounded-2xl bg-[#0a141d]/80 backdrop-blur-sm border border-white/10 p-6 sm:p-8 shadow-2xl transition-all duration-500 ease-in-out">
            <div className="mb-6 sm:mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#E11D48] shadow-md shadow-[#E11D48]/20">
                TribeX<span className="text-white">eSports</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-300 mt-2">
                Join the ultimate gaming experience
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5 sm:space-y-6">
                {/* Username Input */}
                <div className="relative">
                  <label htmlFor="signup-username" className="sr-only">
                    Username
                  </label>
                  <input
                    type="text"
                    id="signup-username"
                    className={`w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300 ${
                      errors.username ? "border-[#FC4E5B]" : ""
                    }`}
                    placeholder="Username"
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                    })}
                  />
                  {errors.username && (
                    <p className="mt-1 text-xs text-[#FC4E5B]">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="relative">
                  <label htmlFor="signup-email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    className={`w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300 ${
                      errors.email ? "border-[#FC4E5B]" : ""
                    }`}
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-[#FC4E5B]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number Input */}
                <div className="relative">
                  <label htmlFor="signup-phone" className="sr-only">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="signup-phone"
                    className={`w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300 ${
                      errors.phone ? "border-[#FC4E5B]" : ""
                    }`}
                    placeholder="Phone Number (10 digits)"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Phone number must be exactly 10 digits",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-[#FC4E5B]">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className="relative">
                  <label htmlFor="signup-password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    className={`w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300 ${
                      errors.password ? "border-[#FC4E5B]" : ""
                    }`}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-[#FC4E5B]">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    className={`h-4 w-4 rounded border-gray-300 bg-gray-700 text-[#E11D48] focus:ring-[#E11D48] transition-all duration-300 ${
                      errors.terms ? "border-[#FC4E5B]" : ""
                    }`}
                    {...register("terms", {
                      required: "You must agree to the terms",
                    })}
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-xs sm:text-sm text-gray-400"
                  >
                    I agree to the
                    <a
                      href="#"
                      className="text-[#E11D48] hover:text-[#FC4E5B] transition-colors duration-300"
                    >
                      {" "}
                      Terms of Service{" "}
                    </a>
                    and
                    <a
                      href="#"
                      className="text-[#E11D48] hover:text-[#FC4E5B] transition-colors duration-300"
                    >
                      {" "}
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.terms && (
                  <p className="mt-1 text-xs text-[#FC4E5B]">
                    {errors.terms.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] py-3 px-4 font-semibold text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#E11D48]/50"
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>

                <div className="flex items-center">
                  <div className="flex-1 border-t border-white/20"></div>
                  <span className="px-3 sm:px-4 text-xs sm:text-sm text-[#E11D48]">
                    OR
                  </span>
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
