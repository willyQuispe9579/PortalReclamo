import React from "react";
import styles from "./CardInfo.module.scss";

interface ICardInfo {
  title: string;
  icon: string;
  value: string;
}

const CardInfo = ({ title, icon, value }: ICardInfo) => {
  return (
    <div className={styles.cardInfo}>
      <h1>
        <p>{title}</p>
        <span className="material-symbols-outlined">{icon}</span>
      </h1>
      <h2>{value}</h2>
    </div>
  );
};

export default CardInfo;
