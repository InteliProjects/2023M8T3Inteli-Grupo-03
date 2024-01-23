import { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

const TextInput: FC<Props> = ({ placeholder, value, setValue }: Props) => {
  return (
    <input
    className={styles.input}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default TextInput;
