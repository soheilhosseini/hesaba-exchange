export const enum Currencies {
  GBP = "GBP",
  USD = "USD",
  JPY = "JPY",
  AUD = "AUD",
}

export const enum CurrenciesSign {
  GBP = "£",
  USD = "$",
  JPY = "¥",
  AUD = "A$",
}

export interface CurrencyInterface {
  title: Currencies;
  value: Currencies;
  symbol: CurrenciesSign;
}
