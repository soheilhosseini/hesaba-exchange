import { useEffect, useState } from "react";
import styles from "./exchange.module.css";
import { useDispatch, useSelector } from "react-redux";
import SwapIcon from "src/assets/swap.svg";
import CurrencyContainer from "src/components/currencyContainer/currencyContainer";
import { Currencies } from "src/types/currencies";
import { useGetExchangesRateQuery } from "src/services/apis";
import { useInputHandler } from "src/hooks/useInputHandler";
import {
  exchange,
  walletSelector,
  WalletStateType,
} from "src/store/slices/wallet";
import { RootState } from "src/store";

const options = [
  { title: Currencies.USD, value: Currencies.USD },
  { title: Currencies.GBP, value: Currencies.GBP },
  { title: Currencies.JPY, value: Currencies.JPY },
  { title: Currencies.AUD, value: Currencies.AUD },
];

const Exchange = () => {
  const dispatch = useDispatch();
  const sourceCurrency = useInputHandler("");
  const sourceAmount = useInputHandler("");
  const destinationCurrency = useInputHandler("");
  const [error, setError] = useState("");
  const wallet = useSelector<RootState, WalletStateType>(walletSelector);
  const {
    data: rate,
    isLoading,
    isUninitialized,
  } = useGetExchangesRateQuery(
    {
      sourceCurrency: sourceCurrency.value,
      destinationCurrency: destinationCurrency.value,
    },
    {
      skip: !sourceCurrency.value || !destinationCurrency.value,
      pollingInterval: 5000,
      refetchOnMountOrArgChange: true,
    }
  );

  const tempRate = 1.25; // **********************************

  useEffect(() => {
    if (!isUninitialized && !rate?.price) {
      setError("Rate is not available");
    } else {
      setError("");
    }
  }, [rate, isUninitialized]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      exchange({
        sourceCurrency: sourceCurrency.value,
        destinationCurrency: destinationCurrency.value,
        rate: tempRate,
        // // rate: Number(rate.price),
        amount: Number(sourceAmount.value),
      })
    );
  };

  const handleSwap = (e: React.MouseEvent) => {
    e.preventDefault();
    const source = sourceCurrency.value;
    const destination = destinationCurrency.value;
    sourceCurrency.onChange({ target: { value: destination } });
    destinationCurrency.onChange({ target: { value: source } });
    sourceAmount.onChange({ target: { value: "" } });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.container__inner}>
        <CurrencyContainer
          input={sourceAmount}
          selectbox={sourceCurrency}
          balance={wallet[sourceCurrency.value]}
          options={options.filter(
            (item) => item.title !== destinationCurrency.value
          )}
        />
        <CurrencyContainer
          selectbox={destinationCurrency}
          balance={wallet[destinationCurrency.value]}
          options={options.filter(
            (item) => item.title !== sourceCurrency.value
          )}
          isDeactive
        />
        <div className={styles.container__inner__rate}>{rate?.price} $</div>
        <button
          className={styles.container__inner__swap}
          onClick={handleSwap}
          disabled={!sourceCurrency.value || !destinationCurrency.value}
          type="button"
        >
          <img src={SwapIcon} />
        </button>
      </div>
      {error && <p className={styles.container__inner__error}>{error}</p>}
      <button
        type="submit"
        className={styles.container__button}
        // disabled={
        //   isLoading ||
        //   !sourceCurrency.value ||
        //   !destinationCurrency.value ||
        //   !rate?.price
        // }
      >
        {isLoading ? "Loading" : "Exchange"}
      </button>
    </form>
  );
};

export default Exchange;
