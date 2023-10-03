import React from "react";
import styles from "./CardSimple.module.scss";
interface ICardSimple {
  text: string;
}

const CardSimple = ({ text }: ICardSimple) => {
  return (
    <div className={styles.cardSimple}>
      <span className={styles.csRight}></span>
      <p>{text}</p>
      <span className={styles.csLeft}></span>
    </div>
  );
};

export default CardSimple;
