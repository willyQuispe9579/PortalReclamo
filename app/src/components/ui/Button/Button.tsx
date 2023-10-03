import React from "react";
import styles from "./Button.module.scss";

interface IButton {
  text: string;
  onClick: any;
  width: string;
  disabled?: boolean;
  background?: string;
}
const Button = ({ text, onClick, width, disabled, background }: IButton) => {
  return (
    <div className={styles.button} style={{ width }}>
      <button onClick={onClick} disabled={disabled} style={{ background }}>
        {text}
      </button>
    </div>
  );
};

export default Button;
