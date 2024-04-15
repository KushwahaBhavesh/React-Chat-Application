import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session';
import userReducer from "./feature/userReducer";
import chatReducer from "./feature/chatReducer";
import authReducer from "./feature/authReducer";
import socketReducer from "./feature/socketReducer";

const persistConfig = {
  key: 'WebChatUserDetails',
  storage, // Corrected usage of localstorage
};

const Persistchat = {
  key: "PersistChat",
  storage: storageSession, // Corrected usage of storageSession
};
const Persistauth = {
  key: "auth",
  storage, // Corrected usage of storageSession
};

const persistUserReducer = persistReducer(persistConfig, userReducer);
const PersistChatReducer = persistReducer(Persistchat, chatReducer);
const persistAuthReducer = persistReducer(Persistauth, authReducer);

export const store = configureStore({
  reducer: {
    user: persistUserReducer,
    chat: PersistChatReducer,
    auth: persistAuthReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistedStore = persistStore(store);
