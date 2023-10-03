import React from "react";
import styles from "./ScreenLoader.module.scss";
import Loader from "@/components/ui/Loader";
export const ScreenLoader = () => {
  return (
    <div className={styles.screenLoader}>
      <Loader />
    </div>
  );
};
