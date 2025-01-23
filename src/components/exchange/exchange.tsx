import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrencyContainer from "@/components/currencyContainer/currencyContainer";
import styles from "./exchange.module.css";
import { Currencies } from "@/types/currencies";
import { useGetExchangesRateQuery } from "../../services/apis";
import { useInputHandler } from "@/hooks/useInputHandler";
import { exchange, walletSelector } from "../../store/slices/wallet";

const options = [
  { text: "GBP", value: "GBP" },
  { text: "USD", value: "USD" },
  { text: "JPY", value: "JPY" },
];

const Exchange = () => {
  const sourceCurrency = useInputHandler("");
  const sourceAmount = useInputHandler("");
  const destinationCurrency = useInputHandler("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const wallet = useSelector(walletSelector);
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
      pollingInterval: 60000,
      refetchOnMountOrArgChange: true,
    }
  );

  const tempRate = 1.25;

  useEffect(() => {
    if (!isUninitialized && !rate?.price) {
      setError("Rate is not available");
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

  const handleSwap = (e: MouseEvent) => {
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
            (item) => item.text !== destinationCurrency.value
          )}
        />
        <CurrencyContainer
          selectbox={destinationCurrency}
          balance={wallet[destinationCurrency.value]}
          options={options.filter((item) => item.text !== sourceCurrency.value)}
          isDeactive
        />
        <div className={styles.container__inner__rate}>{rate?.price} $</div>
        <button className={styles.container__inner__swap} onClick={handleSwap}>
          1
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
