import { FC } from "react";
import SelectSearch from "react-select-search";

import "react-select-search/style.css";

interface Props {
  options: any;
  value: string;
  setValue: (value: any) => void;
  placeholder?: string;
}

const CustomSelect: FC<Props> = ({ options, value, setValue, placeholder }) => {
  const formatedOptions = options.map((option: any) => {
    return { name: option, value: option };
  });

  return (
    <SelectSearch
      options={formatedOptions}
      value={value}
      search
      onChange={(e) => setValue(e)}
      placeholder={placeholder ? placeholder : ""}
    />
  );
};

export default CustomSelect;
