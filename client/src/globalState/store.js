import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import { authApi } from "./api/authApi";
import { tournamentApi } from "./api/tournamentApi";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [tournamentApi.reducerPath]: tournamentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(tournamentApi.middleware),
  
});

export default store;
