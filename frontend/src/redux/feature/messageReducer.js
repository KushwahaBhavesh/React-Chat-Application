import { createSlice } from "@reduxjs/toolkit";
import chatReducer from "./chatReducer";

const messageReducer = createSlice({
  name: "message",
  initialState: {
    message: [],
    notification:[]
  },
  reducers: {
    SET_MESSAGE: (state, action) => {
      state.message = action.payload
    },
    SET_NOTIFICATION:(state,action)=>{
      state.notification=action.payload
    }
  }
})

export const { SET_MESSAGE, SET_NOTIFICATION} = messageReducer.actions
export default messageReducer.reducer