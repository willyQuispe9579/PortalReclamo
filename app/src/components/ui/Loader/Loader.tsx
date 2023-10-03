import React from "react";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <>
      <div className={styles.jumping}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={styles.movin}></div>
    </>
  );
};

export default Loader;
