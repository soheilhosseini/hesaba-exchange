import Exchange from "src/components/exchange/exchange";
import styles from "./exchangePage.module.css";

const ExchangePage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.container__exchangeContainer}>
        <Exchange />
      </div>
    </div>
  );
};

export default ExchangePage;
