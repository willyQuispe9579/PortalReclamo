import React from "react";
import styles from "./CardUser.module.scss";
import InputDisabled from "../InputDisabled";
import LogoUser from "../LogoUser";
import { useUser } from "@/store/hooks";

const CardUser = () => {
  const { user } = useUser();

  return (
    <div className={styles.cardUser}>
      <InputDisabled
        label="Bienvenido"
        width="250px"
        value={`${user.name} ${user.paternallastname} ${user.maternallastname}`}
      />
      <LogoUser width="60px" img={user.photo} />
    </div>
  );
};

export default CardUser;
