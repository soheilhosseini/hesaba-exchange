import styles from "./currencyContainer.module.css";
import SelectBox from "@/components/common/selectbox";
import { Currencies } from "@/types/currencies";
import { InputHandlerInterface } from "@/types/inputHandler";
interface Props {
  isDeactive?: boolean;
  input: InputHandlerInterface;
  selectbox: InputHandlerInterface;
}

const options = [
  { text: "GBP", value: "GBP" },
  { text: "USD", value: "USD" },
  { text: "JPY", value: "JPY" },
];

const CurrencyContainer = ({ isDeactive, input, selectbox }: Props) => {
  return (
    <div
      className={`${styles.container} ${
        isDeactive && styles["container--disabled"]
      }`}
    >
      <div>
        <SelectBox options={options} selectbox={selectbox} />
        <p className={styles.container__price}>2163$</p>
      </div>
      <div>
        <input
          type="number"
          className={styles.container__input}
          disabled={isDeactive}
          placeholder={isDeactive ? "" : "Enter A Value"}
          {...input}
        />
      </div>
    </div>
  );
};
export default CurrencyContainer;
