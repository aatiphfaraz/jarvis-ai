import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import utilReducer from "./slices/utilSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default to localStorage for web
import { combineReducers } from "redux";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["chat", "util"],
};

// Combine reducers (if you have multiple slices)
const rootReducer = combineReducers({
  chat: chatReducer,
  util: utilReducer,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
