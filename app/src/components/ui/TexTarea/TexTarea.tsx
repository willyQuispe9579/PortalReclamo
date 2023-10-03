import React from "react";
import styles from "./TexTarea.module.scss";

interface ITexTarea {
  onChange: any;
  onBlur?: any;
  onFocus?: any;
  placeholder?: string;
  value: string;
  name: string;
  width: string;
  label: string;
  isValid: "texTarea" | "unTexTarea";
}

const TexTarea = ({
  onChange,
  onBlur,
  onFocus,
  placeholder,
  value,
  name,
  width,
  label,
  isValid
}: ITexTarea) => {
  return (
    <div className={styles[isValid]} style={{ width }}>
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        name={name}
      />
    </div>
  );
};

export default TexTarea;
