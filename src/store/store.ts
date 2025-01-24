import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApis } from "src/services/apis";
import walletReducer from "src/store/slices/wallet";

export const store = configureStore({
  reducer: {
    [baseApis.reducerPath]: baseApis.reducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApis.middleware),
});

setupListeners(store.dispatch);
