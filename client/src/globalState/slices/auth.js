import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    user: null,
    isUserLoggedIn: false,
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isUserLoggedIn = true;
    //   state.token = token;
      state.loading = false;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.isUserLoggedIn = false;
    //   state.token = null;
      state.loading = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;  
export default authSlice;