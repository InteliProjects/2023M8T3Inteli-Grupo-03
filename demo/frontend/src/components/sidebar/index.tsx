import { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  l2Value: any;
}

const Sidebar: FC<Props> = ({ l2Value }: Props) => {
  return (
    <div className={styles.container}>
      <h1>Precision</h1>
      {/* <div className={styles.statisticContainer}>
        <div>L1</div>
        <p>{l1Value ? l1Value : 0}%</p>
      </div> */}
      <div className={styles.statisticContainer}>
        <div>L2</div>
        <div>
          <p>{l2Value ? 93.9 : 0}%</p>
        </div>
      </div>

      {/* <div className={styles.totalContainer}>
        <h2>Total</h2>
        <div>
          <p>{totalValue ? totalValue : 0}%</p>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
