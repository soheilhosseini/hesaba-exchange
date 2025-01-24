import styles from "./selectbox.module.css";
import { InputHandlerInterface } from "src/types/inputHandler";

interface Option {
  value: string;
  title: string;
}

interface Props {
  options: Option[];
  selectbox: InputHandlerInterface;
}

const SelectBox = ({ options = [], selectbox }: Props) => {
  const isElementInOptions = Boolean(options.length);
  return (
    <select className={styles.select} defaultValue={""} {...selectbox}>
      <option value={""} disabled>
        choose
      </option>
      {isElementInOptions ? (
        options.map((item) => (
          <option key={item.title} value={item.value}>
            {item.title}
          </option>
        ))
      ) : (
        <option style={{ padding: "10px" }} disabled>
          No Option
        </option>
      )}
    </select>
  );
};

export default SelectBox;
