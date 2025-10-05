import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../baseQuery/baseQueryWithAuth";
export const tournamentApi = createApi({
  reducerPath: "tournamentApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getTournaments: builder.query({
      query: ({ page = 1, limit, game, status ,isVisible} = {}) => {
        const params = new URLSearchParams({ page });
        if (limit) params.append("limit", limit);
        if (game) params.append("game", game);
        if (status) params.append("status", status);
        if (isVisible) params.append("isVisible", isVisible);

        return {
          url: `/tournaments?${params}`,
          credentials: "omit",
        };
      },

    providesTags: [{ type: "Tournament", id: "LIST" }],

    }),

    getTournamentById: builder.query({
      query: (id) => ({
        url: `/tournaments/${id}`,
      }),
      transformResponse: (response) => response,

      providesTags: (result, error, id) => [{ type: "TournamentId", id }],
    }),

    getMyTournaments: builder.query({
      query: ({ page = 1, limit = 6 } = {}) => ({
        url: `/tournaments/my/all?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
     providesTags: () =>[{ type: "MyTournament", id: "LIST" }],

    }),

    registerInTournament: builder.mutation({
      query: ({ tournamentId, teamName, players }) => ({
        url: "/tournaments/register-in",
        method: "POST",
        body: { tournamentId, teamName, players },
      }),

      invalidatesTags: (result, error, { tournament }) => [
        { type: "MyTournament", id: "LIST" }, // 🔄 getMyTournaments
        { type: "TournamentId", id: tournament }, // 🔄 getTournamentById(tournamentId)
        { type: "Tournament", id: "LIST" }, // 🔄 getTournaments
      ],
    }),

    updateRegistrationData: builder.mutation({
      query: ({ registrationId, teamName, members }) => ({
        url: "/tournaments/update-registration",
        method: "PATCH",
        body: { registrationId, teamName, members },
        credentials: "include",
      }),

      invalidatesTags: (result, error, { registrationId }) => [
        { type: "MyTournament", id: "LIST" }, // 🔄 getMyTournaments
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
