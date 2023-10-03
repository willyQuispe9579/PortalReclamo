import React from "react";
import styles from "./Message.module.scss";
import Button from "../Button";

interface IMessage {
  onClick: any;
  title: string;
  children: any;
  textButton: string;
}
const Message = ({ onClick, title, children, textButton }: IMessage) => {
  return (
    <div className={styles.message}>
      <h2>{title}</h2>
      {children}
      <Button onClick={onClick} width="175px" text={textButton} />
    </div>
  );
};

export default Message;
