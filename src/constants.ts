import {
  Currencies,
  CurrenciesSign,
  CurrencyInterface,
} from "src/types/currencies.ts";

export const CURRENCIES: CurrencyInterface[] = [
  { title: Currencies.GBP, value: Currencies.GBP, symbol: CurrenciesSign.GBP },
  { title: Currencies.USD, value: Currencies.USD, symbol: CurrenciesSign.USD },
  { title: Currencies.JPY, value: Currencies.JPY, symbol: CurrenciesSign.JPY },
  { title: Currencies.AUD, value: Currencies.AUD, symbol: CurrenciesSign.AUD },
];

export const POLLING_INTERVAL = 500000;