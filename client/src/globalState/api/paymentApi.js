import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {baseQueryWithAuth} from "../baseQuery/baseQueryWithAuth"
  
export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithAuth,

  endpoints: (builder) => ({
    getMyPayments: builder.query({
      query: () => "/payments/my-payments",
      transformResponse: (response) => response, // you can shape it if needed
    }),


  }),
});
export const { useGetMyPaymentsQuery } =
  paymentApi;
