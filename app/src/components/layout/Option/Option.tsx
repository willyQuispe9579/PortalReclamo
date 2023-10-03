import React from "react";
import styles from "./Option.module.scss";
import Button from "@/components/ui/Button";

interface ICentral {
  children: any;
  onClick: any;
  buttonTitle: string;
  title: string;
  disabled: boolean;
}

const Option = ({ children }: any) => {
  return <div className={styles.option}>{children}</div>;
};

const Left = ({ children }: any) => {
  return <div className={styles.left}>{children}</div>;
};

const Central = ({
  children,
  onClick,
  buttonTitle,
  title,
  disabled,
}: ICentral) => {
  return (
    <div className={styles.central}>
      <h1 className={styles.title}>{title}</h1>
      {children}
      <Button
        text={buttonTitle}
        onClick={onClick}
        width="180px"
        disabled={disabled}
      />
    </div>
  );
};

const Right = ({ children }: any) => {
  return <div className={styles.right}>{children}</div>;
};

export { Option, Left, Central, Right };
