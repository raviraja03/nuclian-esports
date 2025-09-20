import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/api/v1",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getMyPayments: builder.query({
      query: () => "/payments/my-payments",
      transformResponse: (response) => response, // you can shape it if needed
    }),
  }),
});
export const { useGetMyPaymentsQuery } = paymentApi;
