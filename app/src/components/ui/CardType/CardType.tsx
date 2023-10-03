import React from "react";
import styles from "./CardType.module.scss";

interface ICardType {
  width: string;
}

const CardType = ({ width }: ICardType) => {
  return (
    <div className={styles.cardType} style={{ width }}>
      <span className="material-symbols-outlined">accessibility</span>
    </div>
  );
};

export default CardType;
