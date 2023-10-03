import React from "react";

import styles from "./InputDate.module.scss";

interface IntInputDate {
  onChange?: any;
  width: string;
  label: string;
  name: string;
  value: string;
}

const InputDate = ({ onChange, width, label, value, name }: IntInputDate) => {
  return (
    <div className={styles.comboBox} style={{ width }}>
      <label>{label}</label>
      <input type="date" onChange={onChange} value={value} name={name} />
    </div>
  );
};

export default InputDate;
