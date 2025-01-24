import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiKey = import.meta.env.VITE_API_KEY;
export const baseApis = createApi({
  reducerPath: "base",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.twelvedata.com/",
  }),
  endpoints: (builder) => ({
    getExchangesRate: builder.query<string>({
      query({
        sourceCurrency,
        destinationCurrency,
      }: {
        sourceCurrency: string;
        destinationCurrency: string;
      }) {
        return {
          url: `price?symbol=${sourceCurrency}/${destinationCurrency}&apikey=${apiKey}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetExchangesRateQuery } = baseApis;
