import React from "react";
import styles from "./Option.module.scss";
import Button from "@/components/ui/Button";

interface ICentral {
  children: any;
}

const Option = ({ children }: any) => {
  return <div className={styles.option}>{children}</div>;
};

const Left = ({ children }: any) => {
  return <div className={styles.left}>{children}</div>;
};

const Central = ({ children }: ICentral) => {
  return <div className={styles.central}>{children}</div>;
};

const Right = ({ children }: any) => {
  return <div className={styles.right}>{children}</div>;
};

export { Option, Left, Central, Right };
