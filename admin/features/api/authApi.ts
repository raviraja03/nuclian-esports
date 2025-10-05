import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearCredentials } from "../slice/userSlice";
import { baseQuery } from "../baseQuery/baseQuery";
import type { PROFILE_LOGIN_SIGNUP_TYPE } from "@/AllTypes";
import { toast } from "sonner";
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["fetchUser"],

  endpoints: (builder) => ({
    // signup: builder.mutation({
    //   query: (userData) => ({
    //     url: "/users/register",
    //     method: "POST",
    //     body: userData,
    //   }),
    // }),

    login: builder.mutation<
      PROFILE_LOGIN_SIGNUP_TYPE,
      { email: string; password: string; isAdminLogin: boolean }
    >({
      query: (userData) => ({
        url: "/users/login",
        method: "POST",
        body: userData,
      }),
    }),

    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCredentials());
          // dispatch(tournamentApi.util.resetApiState()); // Clear cached API queries
          // dispatch(authApi.util.resetApiState()); // Clear cached API queries
          // dispatch(paymentApi.util.resetApiState()); // Clear cached API queries
          toast.success("Logged out successfully");
        } catch (error) {
          toast.error("  Failed to log out. Please try again.");
        }
      },
    }),

    fetchProfile: builder.query<PROFILE_LOGIN_SIGNUP_TYPE, void>({
      query: () => "/users/profile",
      providesTags: ["fetchUser"],
    }),

    // forgotPassword: builder.mutation({
    //   query: (email) => ({
    //     url: "/users/forgot-password",
    //     method: "POST",
    //     body: email,
    //   }),
    // }),

    // verifyAndResetPassword: builder.mutation({
    //   query: (data) => ({
    //     url: "/users/verify-otp",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // updateProfile: builder.mutation<void>({
    //   query: (data) => ({
    //     url: "/users/profile",
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["fetchUser"],
    // }),
  }),
});

export const {
  // useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useFetchProfileQuery,
  // useForgotPasswordMutation,
  // useVerifyAndResetPasswordMutation,
  // useUpdateProfileMutation,
} = authApi;
export default authApi;
