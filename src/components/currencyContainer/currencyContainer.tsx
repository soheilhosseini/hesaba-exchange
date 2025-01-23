import styles from "./currencyContainer.module.css";
import SelectBox from "@/components/common/selectbox";
import { Currencies } from "@/types/currencies";
import { InputHandlerInterface } from "@/types/inputHandler";

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
        <p className={styles.container__price}>{balance}</p>
      </div>
      <div>
        <input
          type="number"
          className={styles.container__input}
          disabled={isDeactive}
          placeholder={isDeactive ? "" : "Amount"}
          max={balance}
          min={0}
          {...input}
        />
      </div>
    </div>
  );
};
export default CurrencyContainer;
