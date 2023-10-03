import React from "react";
import styles from "./ContainerForm.module.scss";
import Button from "../Button";

interface IContainerForm {
  title: string;
  footer: "flex" | "none";
  children: any;
}

const ContainerForm = ({ title, footer, children }: IContainerForm) => {
  return (
    <div className={styles.containerForm}>
      <div className={styles.containerFormTitle}>{title}</div>
      <div className={styles.containerFormBody}>
        <div className={styles.content}>{children}</div>

        <div className={styles.containerFormFooter} style={{ display: footer }}>
          <h1>Nuestro horario de atención es de</h1>
          <h1> Lunes a Viernes </h1>
          <h1>de 9:00 a 17:30 horas.</h1>
        </div>
      </div>
    </div>
  );
};

export default ContainerForm;
