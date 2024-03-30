import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/userReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";



const persistConfig = {
  key: 'WebChatUserDetails',
  storage,
}



const persistAuthReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    user: persistAuthReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck:false
    }),
})

export const persistedStore = persistStore(store);