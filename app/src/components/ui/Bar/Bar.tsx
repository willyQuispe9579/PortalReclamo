import React from "react";
import styles from "./Bar.module.scss";
interface IBar {
  type: "top" | "bottom";
}

const Bar = ({ type }: IBar) => {
  return type === "top" ? (
    <div className={styles[type]}>
      <div className={styles.itemBarTopOne}></div>
      <div className={styles.itemBarTopTwo}></div>
    </div>
  ) : (
    <div className={styles[type]}>
      <div className={styles.itemBarTopTwo}></div>
      <div className={styles.itemBarTopOne}></div>
    </div>
  );
};

export default Bar;
