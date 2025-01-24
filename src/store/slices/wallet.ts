import { createSlice } from "@reduxjs/toolkit";
import { Currencies } from "src/types/currencies";

export type WalletStateType = Record<Currencies, number>;

const initialState = {
  [Currencies.GBP]: 1000,
  [Currencies.USD]: 1000,
  [Currencies.JPY]: 1000,
  [Currencies.AUD]: 1000,
};

const WalletSlice = createSlice({
  name: "wallet",
  initialState: initialState,
  reducers: {
    exchange(state, { payload }) {
      const sourceCurrency = payload.sourceCurrency as Currencies;
      const amount = payload.amount as number;
      const destinationCurrency = payload.destinationCurrency as Currencies;
      const rate = payload.rate as number;
      state[sourceCurrency] -= amount;
      state[destinationCurrency] += amount * rate;
    },
  },
});

export const { exchange } = WalletSlice.actions;
export default WalletSlice.reducer;

export const walletSelector = (state: WalletStateType) => state.wallet;
