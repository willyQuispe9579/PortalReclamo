import React from "react";
import styles from "./LogoUser.module.scss";

interface ILogoUser {
  img: string;
  width: string;
}
const LogoUser = ({ img, width }: ILogoUser) => {
  return (
    <div className={styles.logoUser} style={{ width, height: width }}>
      <img src={img} alt="Logo" />
    </div>
  );
};

export default LogoUser;
