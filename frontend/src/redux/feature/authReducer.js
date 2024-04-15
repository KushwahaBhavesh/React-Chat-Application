import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    loading: true,
    },
  reducers: {
    LOGIN: (state) => {
      // Store authentication state in localStorage
      state.loading = false
      state.isAuthenticated = true;
    },

    LOGOUT: (state) => {
      // Remove authentication state from localStorage
      state.isAuthenticated = false;
    },
  },
});

export const { LOGIN, LOGOUT } = authReducer.actions;
export default authReducer.reducer;
