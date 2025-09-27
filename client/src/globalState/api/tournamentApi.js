import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../baseQuery/baseQueryWithAuth";
export const tournamentApi = createApi({
  reducerPath: "tournamentApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getTournaments: builder.query({
      query: ({ page = 1, limit, game, status } = {}) => {
        const params = new URLSearchParams({ page });
        if (limit) params.append("limit", limit);
        if (game) params.append("game", game);
        if (status) params.append("status", status);

        return {
          url: `/tournaments?${params.toString()}`,
          credentials: "omit",
        };
      },

      providesTags: (result) =>
        result?.data?.length
          ? [
              ...result.data.map((t) => ({
                type: "Tournament",
                id: t._id,
              })),
              { type: "Tournament", id: "LIST" },
            ]
          : [{ type: "Tournament", id: "LIST" }],
    }),

    getTournamentById: builder.query({
      query: (id) => ({
        url: `/tournaments/${id}`,
      }),
      keepUnusedDataFor: 0,
      transformResponse: (response) => response,

      providesTags: (result, error, id) => [{ type: "TournamentId", id }],
    }),

    getMyTournaments: builder.query({
      query: ({ page = 1, limit = 6 } = {}) => ({
        url: `/tournaments/my/all?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((entry) => ({
                type: "MyTournament",
                id: entry._id, // 👈 registrationId
              })),
              { type: "MyTournament", id: "LIST" },
            ]
          : [{ type: "MyTournament", id: "LIST" }],
    }),

    registerInTournament: builder.mutation({
      query: ({ tournament, teamName, players }) => ({
        url: "/payments/register-in",
        method: "POST",
        body: { tournament, teamName, players },
      }),

      invalidatesTags: (result, error, { tournament }) => [
        { type: "MyTournament", id: "LIST" }, // 🔄 getMyTournaments
        { type: "TournamentId", id: tournament }, // 🔄 getTournamentById(tournamentId)
        { type: "Tournament", id: "LIST" }, // 🔄 getTournaments
      ],
    }),

    updateRegistrationData: builder.mutation({
      query: ({ registrationId, teamName, members }) => ({
        url: "/payments/update-registration",
        method: "PATCH",
        body: { registrationId, teamName, members },
        credentials: "include",
      }),

      invalidatesTags: (result, error, { registrationId }) => [
        { type: "MyTournament", id: registrationId }, // 🔄 getMyTournaments
      ],
    }),
  }),
});

export const {
  useGetTournamentsQuery,
  useGetTournamentByIdQuery,
  useGetMyTournamentsQuery,
  useRegisterInTournamentMutation,
  useUpdateRegistrationDataMutation,
} = tournamentApi;
