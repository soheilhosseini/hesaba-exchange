import styles from "./currencyContainer.module.css";
import SelectBox from "../common/selectbox";
import {
  Currencies,
  CurrencyInterface,
} from "../../types/currencies";
import { InputHandlerInterface } from "../../types/inputHandler";

interface option {
  title: Currencies;
  value: Currencies;
}
interface Props {
  isDeactive?: boolean;
  input: InputHandlerInterface;
  selectbox: InputHandlerInterface;
  balance: number;
  options: option[];
}

const CurrencyContainer = ({
  isDeactive,
  input,
  selectbox,
  balance,
  options,
}: Props) => {
  const currency = options.find(
    (item) => item.title === selectbox.value
  ) as CurrencyInterface;
  return (
    <div
      className={`${styles.container} ${
        isDeactive && styles["container--disabled"]
      }`}
    >
      <div>
        <SelectBox options={options} selectbox={selectbox} />
        <p className={styles.container__price}>
          {selectbox.value && balance + " " + currency.symbol}
        </p>
      </div>
      <div>
        {isDeactive ? (
          <input
            type="number"
            className={styles.container__input}
            disabled
            {...input}
          />
        ) : (
          <input
            type="number"
            className={styles.container__input}
            placeholder={"Amount"}
            max={balance}
            min={0.01}
            step="0.01"
            {...input}
          />
        )}
      </div>
    </div>
  );
};
export default CurrencyContainer;
