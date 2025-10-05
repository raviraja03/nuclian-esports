import { configureStore } from "@reduxjs/toolkit";
// import { dashboardApi } from '../features/dashboard/dashboardApi';
// import { usersApi } from '../features/users/usersApi';
// import { tournamentsApi } from '../features/tournaments/tournamentsApi';
import authApi from "@/features/api/authApi";
import userSlice from "@/features/slice/userSlice";
export const store = configureStore({
  reducer: {
    //slices
    userslice: userSlice.reducer,

    //api
    [authApi.reducerPath]: authApi.reducer,
    // [usersApi.reducerPath]: usersApi.reducer,
    // [tournamentsApi.reducerPath]: tournamentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
  //   .concat(usersApi.middleware)
  //   .concat(tournamentsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
