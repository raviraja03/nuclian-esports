import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: true,
    user: null,
    isUserLoggedIn: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isUserLoggedIn = true;
      state.loading = false;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.isUserLoggedIn = false;
      state.loading = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;  
export default authSlice;