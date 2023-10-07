import React from "react";
import styles from "./Footer.module.scss";

const Footer = ({ children }: any) => {
  return <div className={styles.footer}>{children}</div>;
};

export default Footer;
