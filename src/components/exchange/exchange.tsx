import { useEffect, useState } from "react";
import styles from "./exchange.module.css";
import { useDispatch, useSelector } from "react-redux";
import SwapIcon from "../../assets/swap.svg";
import TrendingUpIcon from "../../assets/trendingUp.svg";
import CurrencyContainer from "../../components/currencyContainer/currencyContainer";
import { CURRENCIES } from "../../constants";
import { CurrencyInterface } from "../../types/currencies";
import { useGetExchangesRateQuery } from "../../services/apis";
import { useInputHandler } from "../../hooks/useInputHandler";
import { RootState } from "../../store/store";
import {
  exchange,
  walletSelector,
  WalletStateType,
} from "../../store/slices/wallet";
import { POLLING_INTERVAL } from "../../constants";

const Exchange = () => {
  const dispatch = useDispatch();
  const sourceCurrency = useInputHandler("");
  const sourceAmount = useInputHandler("");
  const destinationCurrency = useInputHandler("");
  const destinationAmount = useInputHandler("");
  const [error, setError] = useState("");
  const wallet = useSelector<RootState, WalletStateType>(walletSelector);
  const { data, isLoading, isUninitialized } = useGetExchangesRateQuery(
    {
      sourceCurrency: sourceCurrency.value.toString(),
      destinationCurrency: destinationCurrency.value.toString(),
    },
    {
      skip: !sourceCurrency.value || !destinationCurrency.value,
      pollingInterval: POLLING_INTERVAL,
      refetchOnMountOrArgChange: true,
    }
  );
  const rate = data?.price;

  useEffect(() => {
    if (!isUninitialized && !isLoading && !rate) {
      setError("Rate is not available");
    } else {
      setError("");
    }
  }, [rate, isLoading, isUninitialized]);

  useEffect(() => {
    if (sourceAmount.value && rate) {
      destinationAmount.onChange({
        target: { value: Number(sourceAmount.value) * rate },
      });
    }
  }, [sourceAmount.value, rate]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      exchange({
        sourceCurrency: sourceCurrency.value,
        destinationCurrency: destinationCurrency.value,
        rate: Number(rate),
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
    destinationAmount.onChange({ target: { value: "" } });
  };

  const disableExchangeSubmitButton =
    isLoading ||
    !sourceCurrency.value ||
    !destinationCurrency.value ||
    !rate ||
    !sourceAmount.value;

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <p className={styles.container__title}>
        Choose Currencies and set amount to exchange
      </p>
      <div className={styles.container__inner}>
        <CurrencyContainer
          input={sourceAmount}
          selectbox={sourceCurrency}
          balance={wallet[sourceCurrency.value as keyof WalletStateType]}
          options={CURRENCIES.filter(
            (item: CurrencyInterface) =>
              item.title !== destinationCurrency.value
          )}
        />
        <CurrencyContainer
          input={destinationAmount}
          selectbox={destinationCurrency}
          balance={wallet[destinationCurrency.value as keyof WalletStateType]}
          options={CURRENCIES.filter(
            (item: CurrencyInterface) => item.title !== sourceCurrency.value
          )}
          isDeactive
        />
        {rate && (
          <div className={styles.container__inner__rate}>
            <img src={TrendingUpIcon} />
            <span>{rate} $</span>
          </div>
        )}
        <button
          className={styles.container__inner__swap}
          onClick={handleSwap}
          disabled={!sourceCurrency.value || !destinationCurrency.value}
          type="button"
        >
          <img src={SwapIcon} style={{ width: "20px" }} />
        </button>
      </div>
      {error && <p className={styles.container__error}>{error}</p>}
      <button
        type="submit"
        className={styles.container__button}
        disabled={disableExchangeSubmitButton}
      >
        {isLoading ? "Loading" : "Exchange"}
      </button>
    </form>
  );
};

export default Exchange;
