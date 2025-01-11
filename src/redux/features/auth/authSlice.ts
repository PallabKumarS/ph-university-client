import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

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
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },

    // clear user info after logout
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export default authSlice;
export const { setUser, setToken, logout } = authSlice.actions;
