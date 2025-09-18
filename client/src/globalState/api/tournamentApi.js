import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tournamentApi = createApi({
  reducerPath: "tournamentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/api/v1",
    credentials: "include", // ✅ include cookies if auth needed
  }),
  endpoints: (builder) => ({
    getTournaments: builder.query({
      query: ({ page = 1, limit, game, status } = {}) => {
        const params = new URLSearchParams({ page });
        if (limit) params.append("limit", limit);
        if (game) params.append("game", game);
        if (status) params.append("status", status);

        return `/tournaments?${params.toString()}`;
      },
      transformResponse: (response) => response,
    }),

    getTournamentById: builder.query({
      query: (id) => `/tournaments/${id}`,
      transformResponse: (response) => response,
    }),
  }),
});

export const { useGetTournamentsQuery, useGetTournamentByIdQuery } =
  tournamentApi;
