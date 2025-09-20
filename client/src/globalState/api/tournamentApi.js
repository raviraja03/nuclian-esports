import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tournamentApi = createApi({
  reducerPath: "tournamentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    // credentials: "include", // ✅ include cookies if auth needed
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
      providesTags: (result) =>
        result?.tournaments
          ? [
              ...result.tournaments.map((t) => ({
                type: "Tournament",
                id: t._id,
              })),
              { type: "Tournament", id: "LIST" },
            ]
          : [{ type: "Tournament", id: "LIST" }],
    }),

    getTournamentById: builder.query({
      query: (id) => {
        return {
          url: `/tournaments/${id}`,
          credentials: "include",
        };
      },

      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{ type: "Tournament", id }],
    }),

    getMyTournaments: builder.query({
      query: ({ page = 1, limit = 6 } = {}) => ({
        url: `/tournaments/my/all?page=${page}&limit=${limit}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response) => response,
      providesTags: (result) =>
        result?.data
          ? result.data.map((t) => ({ type: "TournamentId", id: t._id }))
          : [],
    }),
  }),
});

export const {
  useGetTournamentsQuery,
  useGetTournamentByIdQuery,
  useGetMyTournamentsQuery,
} = tournamentApi;
