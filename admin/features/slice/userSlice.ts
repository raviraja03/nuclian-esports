import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { USER_SLICE_TYPE } from "@/AllTypes";


interface InitialState {
  user: USER_SLICE_TYPE | null;
}

const initialState: InitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "userslice",
  initialState:initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: USER_SLICE_TYPE }>) => {
      state.user = action.payload.user;
    },
    clearCredentials: (state) => {
      state.user = null;
    },
  },
});


export const { setCredentials, clearCredentials } = userSlice.actions;
export default userSlice;
