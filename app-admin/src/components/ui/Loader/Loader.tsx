import React from "react";
import styles from "./Loader.module.scss";

interface IntLoader {
  width: string;
}
const Loader = ({ width }: IntLoader) => {
  return (
    <div className={styles.loader} style={{ width, height: width }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
