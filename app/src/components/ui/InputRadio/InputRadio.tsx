import React, { useState } from "react";
import styles from "./InputRadio.module.scss";

interface IInputRadio {
  options: any;
  onChange: (value: string) => void;
  width: string;
  selectedOption: string;
}

const InputRadio = ({
  options,
  onChange,
  width,
  selectedOption,
}: IInputRadio) => {
  return (
    <div className={styles.inputRadio}>
      <span>Seleccion segun el estado</span>
      {options.map((option: any, key: number) => (
        <>
          <input
            key={key}
            type="radio"
            id={option.value}
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => onChange(option.value)}
          />
          <label key={option.value} htmlFor={option.value} style={{ width }}>
            {option.label}
          </label>
        </>
      ))}
    </div>
  );
};

export default InputRadio;
