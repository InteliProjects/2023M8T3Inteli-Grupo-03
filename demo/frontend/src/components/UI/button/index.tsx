import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
  form: string;
}

const Button: FC<Props> = ({ children, form }: Props) => {
  return (
    <button className={styles.button} form={form}>
      {children}
    </button>
  );
};

export default Button;
