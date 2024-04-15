import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
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
      (state.isError = false);
    },
    REGISTER_USER_FAILURE: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    LOGIN_USER_REQUEST: (state) => {
      state.isLoading = false;
    },
    LOGIN_USER_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      (state.isError = false);
    },
    LOGIN_USER_FAILURE: (state) => {
      state.isLoading = false;
      state.isError = true
    },
    FETCH_PROFILE_REQUEST: (state) => {
      (state.isLoading = true);
    },
    FETCH_PROFILE_SUCCESS: (state, action) => {
      (state.isLoading = false);
      (state.user = action.payload);
      (state.isError = false);
    },
    FETCH_PROFILE_FAILURE: (state, action) => {
      (state.isLoading = false);
      (state.isError = true);
    },
    UPDATE_USER_REQUEST: (state) => {
      state.isLoading = true;
    },
    UPDATE_USER_SUCCESS: (state, action) => {
      (state.isLoading = false);
      (state.user = action.payload);
      (state.isError = false)

    },
    UPDATE_USER_FAILURE: (state) => {
      (state.isLoading = false),
        (state.isError = true);
    },
    FETCH_ALL_USER_REQUEST: (state) => {
      (state.isLoading = true);
    },
    FETCH_ALL_USER_SUCCESS: (state, action) => {
      (state.isLoading = false),
        (state.isError = false)
    },
    FETCH_ALL_USER_FAILURE: (state) => {
      (state.isLoading = false),
        (state.isError = true);
    },
    LOGOUT_SUCCESS: (state) => {
      state.user = []
    }
  }
});

export const {
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  FETCH_ALL_USER_FAILURE,
  FETCH_ALL_USER_REQUEST,
  FETCH_ALL_USER_SUCCESS,
  LOGOUT_SUCCESS
} = userReducer.actions;
export default userReducer.reducer;
