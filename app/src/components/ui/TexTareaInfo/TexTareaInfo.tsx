import React from "react";
import styles from "./TexTareaInfo.module.scss";
interface IntTexTareaInfo {
  label: string;
  width: string;
  value: string;
}
const TexTareaInfo = ({ label, width, value }: IntTexTareaInfo) => {
  return (
    <div className={styles.textTareaInfo} style={{ width }}>
      <label>{label}</label>
      <textarea disabled={true} value={value} />
    </div>
  );
};

export default TexTareaInfo;
