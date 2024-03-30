import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    REGISTER_USER_REQUEST: (state) => {
      state.isLoading = true;
    },
    REGISTER_USER_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    REGISTER_USER_FAILURE: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    LOGIN_USER_REQUEST: (state) => {
      state.isLoading = true;
    },
    LOGIN_USER_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    LOGIN_USER_FAILURE: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
    // FETCH_PROFILE_REQUEST: (state) => {
    //   (state.isLoading = true);
    // },
    // FETCH_PROFILE_SUCCESS: (state, user) => {
    //   (state.isLoading = false);
    //   (state.isAuthenticated = true);
    // },
    // FETCH_PROFILE_FAILURE: (state) => {
    //   (state.isLoading = false);
    //   (state.isError = action.payload);
    // },
    UPDATE_USER_REQUEST: (state) => {
      state.isLoading = true;
    },
    UPDATE_USER_SUCCESS: (state, action) => {
      (state.isLoading = false);
    },
    UPDATE_USER_FAILURE: (state, action) => {
      (state.isLoading = false),
        (state.isError = action.payload);
    },
  },
});

export const {
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} = userReducer.actions;
export default userReducer.reducer;
