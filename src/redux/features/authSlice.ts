import { createSlice } from "@reduxjs/toolkit";

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
