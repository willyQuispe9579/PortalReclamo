import React from "react";

import styles from "./ComboBox.module.scss";

interface IntComboBox {
  onChange?: any;
  isValid: "comboBox" | "unComboBox";
  width: string;
  label: string;
  data: any;
  name: string;
  value: string;
  valueName: string;
  textName: string;
}

const ComboBox = ({
  onChange,
  isValid,
  width,
  label,
  data,
  valueName,
  textName,
  name,
  value,
}: IntComboBox) => {
  return (
    <div className={styles[isValid]}  style={{ width }}>
      <label>{label}</label>
      <select name={name} value={value} onChange={onChange}>
        {data.map((item: any, idx: number) => (
          <option key={idx} value={item[valueName]}>
            {item[textName]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComboBox;
