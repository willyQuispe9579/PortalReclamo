import React, { useState } from "react";

import styles from "./Message.module.scss";

interface IntMessage {
  msg: string;
  type: "error" | "success" | "alert";
}

const Message = ({ msg, type }: IntMessage) => {
  const [display, setDisplay] = useState("flex");

  const handleOnClick = () => {
    setDisplay("none");
  };

  return (
    <div className={styles[type]} style={{ display }}>
      <h5>{msg}</h5>
      <span onClick={handleOnClick} className="material-symbols-outlined">
        close
      </span>
    </div>
  );
};

export default Message;
