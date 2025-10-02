import { createSlice } from "@reduxjs/toolkit";

interface initialStateT {
      user: Record<string, any> | null;

}

const initialState: initialStateT = {
    user: {}
};

export const userSlice = createSlice({
    name: "USER",
    initialState,
    reducers: {
  setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    clearCredentials: (state) => {
      state.user = null;
    },
        
    }
});
export const { setCredentials, clearCredentials } = userSlice.actions;  


export default userSlice;