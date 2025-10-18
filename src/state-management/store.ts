import apiConfig from "@/services/apiConfig";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      [apiConfig.reducerPath]: apiConfig.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiConfig.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
