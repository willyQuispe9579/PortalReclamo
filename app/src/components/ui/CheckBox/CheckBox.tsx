import React, { useState, useEffect, useCallback } from "react";
import styles from "./Checkbox.module.scss";

interface ICheckBox {
  onChange: any;
  checked: boolean;
  valor: string;
}

const CheckBox = ({ onChange, checked, valor }: ICheckBox) => {
  return (
    <div className={styles.checkBoxs}>
      <input
        id="check-1"
        type="checkbox"
        checked={!checked}
        onChange={onChange}
      />
      <label htmlFor="check-1">{valor}</label>
    </div>
  );
};

export default CheckBox;
