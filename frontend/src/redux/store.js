import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session';
import userReducer from "./feature/userReducer";
import chatReducer from "./feature/chatReducer";

const persistConfig = {
  key: 'WebChatUserDetails',
  storage,
};

const Persistchat = {
  key: "PersistChat",
  storage: storageSession, // Corrected usage of storageSession
};

const persistAuthReducer = persistReducer(persistConfig, userReducer);
const PersistChatReducer = persistReducer(Persistchat, chatReducer);

export const store = configureStore({
  reducer: {
    user: persistAuthReducer,
    chat: PersistChatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistedStore = persistStore(store);
