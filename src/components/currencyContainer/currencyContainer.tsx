import styles from "./currencyContainer.module.css";
import SelectBox from "src/components/common/selectbox";
import { Currencies, CurrenciesSign } from "src/types/currencies";
import { InputHandlerInterface } from "src/types/inputHandler";

interface option {
  text: Currencies;
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
  return (
    <div
      className={`${styles.container} ${
        isDeactive && styles["container--disabled"]
      }`}
    >
      <div>
        <SelectBox options={options} selectbox={selectbox} />
        <p className={styles.container__price}>
          {selectbox.value && balance + " " + CurrenciesSign[selectbox.value]}
        </p>
      </div>
      <div>
        <input
          type="number"
          className={styles.container__input}
          disabled={isDeactive}
          placeholder={isDeactive ? "" : "Amount"}
          max={!isDeactive && balance}
          min={!isDeactive && 0.01}
          step="0.01"
          {...input}
        />
      </div>
    </div>
  );
};
export default CurrencyContainer;
