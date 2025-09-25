import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import modalSlice from "./slices/modal";
//apis
import { authApi } from "./api/authApi";
import { tournamentApi } from "./api/tournamentApi";
import { paymentApi } from "./api/paymentApi";
import {socketMiddleware} from "./middleware/socketMiddleware";

const store = configureStore({
  reducer: {
    //slices
    auth: authSlice.reducer,
    modal: modalSlice.reducer,

    //apis
    [authApi.reducerPath]: authApi.reducer,
    [tournamentApi.reducerPath]: tournamentApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(tournamentApi.middleware)
      .concat(paymentApi.middleware)
      .concat(socketMiddleware),
});

export default store;
