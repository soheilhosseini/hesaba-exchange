import { createSlice } from "@reduxjs/toolkit";
import { Currencies } from "../../types/currencies";

const initialState = {
  [Currencies.GBP]: 1000,
  [Currencies.USD]: 1000,
  [Currencies.JPY]: 1000,
};

const WalletSlice = createSlice({
  name: "wallet",
  initialState: initialState,
  reducers: {
    exchange(state, { payload }) {
        // state[payload.]
    },

  },
});

export const {exchange} = WalletSlice.actions;
export default WalletSlice.reducer
