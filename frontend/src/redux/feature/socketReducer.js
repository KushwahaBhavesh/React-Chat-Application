import { createSlice } from "@reduxjs/toolkit";

const socketRedcuer = createSlice({
  name: "socket",
  initialState: {
    activeUser: [],
    socket: null,
  },
  reducers: {
    ACTIVE_USER: (state, action) => {
      state.activeUser = action.payload
    },
    SET_SOCKET: (state, action) => {
      state.socket = action.payload
    }
  }
})

export const {ACTIVE_USER,SET_SOCKET} = socketRedcuer.actions
export default socketRedcuer.reducer