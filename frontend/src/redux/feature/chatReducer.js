import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedUser: null,
  conversation: null,
  chatList: [],
  isLoading: false,
  isopen: false,
}

const chatReducer = createSlice({
  name: "chat",
  initialState,
  reducers: {
    SELECTE_USER: (state, action) => {
      state.selectedUser = action.payload;

    },
    SET_CONVERSATION: (state, action) => {
      state.conversation = action.payload;
    },
    // Common Actions
    REQUEST: (state) => {
      (state.isLoading = true)
    },
    SUCCESS: (state, action) => {
      (state.isLoading = false),
        (state.chatList = action.payload);
    },
    FAILURE: (state) => {
      (state.isLoading = false)
    },
    Is_OPEN: (state) => {
      state.isopen = true;
    },
    Is_CLOSE: (state) => {
      state.isopen = false;
    },
    LOGOUT_CLOSE: (state) => {
      state.chatList = [],
      state.selectedUser=null


    }

  }
})

export const {
  SELECTE_USER,
  SET_CONVERSATION,
  REQUEST, SUCCESS, FAILURE,
  Is_CLOSE, Is_OPEN,LOGOUT_CLOSE
} = chatReducer.actions;

export default chatReducer.reducer