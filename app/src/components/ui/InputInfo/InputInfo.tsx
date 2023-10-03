import React from "react";
import styles from "./InputInfo.module.scss";
interface IntInputInfo {
  label: string;
  width: string;
  value: string;
}
const InputInfo = ({ label, width, value }: IntInputInfo) => {
  return (
    <div className={styles.inputInfo} style={{ width }}>
      <label>{label}</label>
      <input disabled={true} value={value} />
    </div>
  );
};

export default InputInfo;
