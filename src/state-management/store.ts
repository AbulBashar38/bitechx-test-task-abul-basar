import apiConfig from "@/services/apiConfig";
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import authReducer from "./features/authSlice";
import counterReducer from "./features/counterSlice";
import storage from "./storage";
// Persist config for the 'auth' slice
const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["token"], // Only the 'token' will be persisted
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      auth: persistedAuthReducer,
      [apiConfig.reducerPath]: apiConfig.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(apiConfig.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
