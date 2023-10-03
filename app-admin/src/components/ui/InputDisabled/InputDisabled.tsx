import React from "react";
import styles from "./InputDisabled.module.scss";

interface IInputDisabled {
  width: string;
  label: string;
  value: string;
}

const InputDisabled = ({ width, label, value }: IInputDisabled) => {
  return (
    <div className={styles.inputDisabled} style={{ width }}>
      <label>{label}</label>
      <p>{value}</p>
    </div>
  );
};

export default InputDisabled;
