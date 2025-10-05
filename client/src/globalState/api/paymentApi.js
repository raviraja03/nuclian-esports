import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../baseQuery/baseQueryWithAuth";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Payment"],

  endpoints: (builder) => ({
    getMyPayments: builder.query({
      query: () => "/payments/my-payments",
      providesTags: (result) => [{ type: "Payment", id: "LIST" }],
    }),

    verifyPayment: builder.mutation({
      query: ({ orderId }) => ({
        url: "/payments/verify",
        method: "POST",
        body: { orderId },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Payment", id: "LIST" },
      ],
    }),
  }),
});
export const { useGetMyPaymentsQuery, useVerifyPaymentMutation } = paymentApi;
