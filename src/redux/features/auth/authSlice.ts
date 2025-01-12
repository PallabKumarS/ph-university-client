import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // set user after login
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },

    // clear user info after logout
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export default authSlice;
export const { setUser, logout } = authSlice.actions;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;
