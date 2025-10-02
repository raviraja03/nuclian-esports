import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearCredentials } from "../slice/userSlice";
import { baseQueryWithAuth } from "../baseQuery/baseQuery";
// import {paymentApi} from "./paymentApi"
// import {tournamentApi} from "./tournamentApi"
export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: baseQueryWithAuth,
  tagTypes: ["fetchUser"],

  endpoints: (builder) => ({
    // signup: builder.mutation({
    //   query: (userData) => ({
    //     url: "/users/register",
    //     method: "POST",
    //     body: userData,
    //   }),
    // }),
    login: builder.mutation({
      query: (userData:{email:string,password:string}) => ({
        url: "/users/admin/login",
        method: "POST",
        body: userData,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearCredentials());
          dispatch(tournamentApi.util.resetApiState()); // Clear cached API queries
          dispatch(authApi.util.resetApiState()); // Clear cached API queries
          dispatch(paymentApi.util.resetApiState()); // Clear cached API queries
          toast.success("Logged out successfully");
        } catch (error) {
          console.log(error);
        }
      },
    }),

    fetchProfile: builder.query({
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
    // updateProfile: builder.mutation({
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
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useFetchProfileQuery,
  useForgotPasswordMutation,
  useVerifyAndResetPasswordMutation,
  useUpdateProfileMutation,
} = authApi;
