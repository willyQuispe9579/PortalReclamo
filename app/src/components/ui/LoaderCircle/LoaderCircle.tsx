import React from "react";
import styles from "./LoaderCircle.module.scss";

interface IntLoader {
  width: string;
}
const LoaderCircle = ({ width }: IntLoader) => {
  return (
    <div className={styles.loader} style={{ width, height: width }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoaderCircle;
